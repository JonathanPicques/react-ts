import {Action} from 'redux';
import {expect} from 'chai';
import {chainReducers} from './chainReducers';

interface TestState {
    counter: number;
}

describe('chainReducers', () => {
    it('tests chainReducers', () => {
        const reducer1 = (state: TestState, action: Action): TestState => {
            if (action.type === 'inc') {
                return {...state, ...{counter: state.counter + 50}};
            }
            return state;
        };
        const reducer2 = (state: TestState, action: Action): TestState => {
            if (action.type === 'dec') {
                return {...state, ...{counter: state.counter - 25}};
            }
            return state;
        };
        const reducers = chainReducers({counter: -100}, [reducer1, reducer2]);
        let storeState: TestState | undefined = undefined;
        storeState = reducers(storeState, {type: 'init'});
        expect(storeState).to.be.eql({counter: -100});
        storeState = reducers(storeState, {type: 'inc'});
        expect(storeState).to.be.eql({counter: -50});
        storeState = reducers(storeState, {type: 'dec'});
        expect(storeState).to.be.eql({counter: -75});
    });
});
