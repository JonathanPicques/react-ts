import {Action} from 'redux';
import {expect} from 'chai';
import {chainReducers} from './chainReducers';

interface TestState {
    counter: number;
}

const incReducer = (state: TestState, action: Action): TestState => {
    if (action.type === 'inc') {
        return {...state, ...{counter: state.counter + 50}};
    }
    return state;
};

const decReducer = (state: TestState, action: Action): TestState => {
    if (action.type === 'dec') {
        return {...state, ...{counter: state.counter - 25}};
    }
    return state;
};

describe('chainReducers', () => {
    it('tests chainReducers with initialState', () => {
        const reducers = chainReducers({counter: -100}, [incReducer, decReducer]);
        expect(reducers(undefined, {type: '@@INIT'})).to.be.deep.equal({counter: -100});
        expect(reducers(undefined, {type: 'inc'})).to.be.deep.equal({counter: -50});
        expect(reducers(undefined, {type: 'dec'})).to.be.deep.equal({counter: -125});
    });
    it('tests chainReducers with severale actions', () => {
        const reducers = chainReducers({counter: -100}, [incReducer, decReducer]);
        expect(reducers(undefined, {type: '@@INIT'})).to.be.deep.equal({counter: -100});
        expect(reducers({counter: -100}, {type: 'inc'})).to.be.deep.equal({counter: -50});
        expect(reducers({counter: -50}, {type: 'dec'})).to.be.deep.equal({counter: -75});
        expect(reducers({counter: -75}, {type: 'dec'})).to.be.deep.equal({counter: -100});
    });
    it('tests chainReducers commutativity', () => {
        const reducers = chainReducers({counter: -100}, [decReducer, incReducer]);
        expect(reducers(undefined, {type: '@@INIT'})).to.be.deep.equal({counter: -100});
        expect(reducers({counter: -100}, {type: 'inc'})).to.be.deep.equal({counter: -50});
        expect(reducers({counter: -50}, {type: 'dec'})).to.be.deep.equal({counter: -75});
        expect(reducers({counter: -75}, {type: 'dec'})).to.be.deep.equal({counter: -100});
    });
});
