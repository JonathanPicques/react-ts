const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const packageJson = require('../package.json');

const stat = promisify(fs.stat);
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const check = ['.js', '.jsx', '.ts', '.tsx'];
const checker = /\bimport\s+(?:.+\s+from\s+)?[\'"]([^"\']+)["\']/g;
const dependencies = Object.keys(packageJson.dependencies).reduce((a, dep) => ({...a, ...{[dep]: 0}}), {});
const devDependencies = Object.keys(packageJson.devDependencies).reduce((a, dep) => ({...a, ...{[dep]: 0}}), {});

const checkDeps = async dir => {
    const relativeFiles = await readDir(dir);
    for (const relativeFile of relativeFiles) {
        const file = path.join(dir, relativeFile);
        const statFile = await stat(file);
        if (statFile.isDirectory()) {
            await checkDeps(file);
        } else if (check.includes(path.extname(file))) {
            const content = await readFile(file, 'utf8');
            let imports = [];
            while ((imports = checker.exec(content)) !== null) {
                const module = imports[1];
                if (typeof dependencies[module] !== 'undefined') dependencies[module] += 1;
                if (typeof devDependencies[module] !== 'undefined') devDependencies[module] += 1;
            }
        }
    }
};
const ignoreDep = module => module.indexOf('@types') === -1 && !['typescript', 'react-scripts-ts', 'react-transition-group'].includes(module);
const unusedDeps = deps => {
    return Object.keys(deps)
        .filter(ignoreDep)
        .reduce((a, dep) => (deps[dep] === 0 ? [...a, dep] : a), []);
};
const sortedDeps = deps => {
    return Object.keys(deps)
        .filter(ignoreDep)
        .filter(dep => deps[dep] > 0)
        .sort((depA, depB) => (deps[depA] > deps[depB] ? -1 : 1))
        .map(dep => ({module: dep, count: deps[dep]}));
};

(async function() {
    await checkDeps(path.join(__dirname, '../src'));

    const arg = (process.argv[2] || '').trim();
    switch (arg) {
        case '--use': {
            console.log(sortedDeps({...dependencies, ...devDependencies}));
            break;
        }
        default: {
            await checkDeps(path.join(__dirname, '../src'));
            console.group('Unused dependencies');
            {
                console.log('yarn remove', unusedDeps({...dependencies, ...devDependencies}).join(' '));
            }
            console.groupEnd();
            process.exit(1);
            break;
        }
    }
})();
