import {Action} from 'redux';

type Reducer<T> = (state: T | undefined, action: Action) => T;
type SplitReducer<T> = (state: T, action: Action) => T;
const chainReducers = <T>(initialState: T, reducers: SplitReducer<T>[]): Reducer<T> => {
    return (state: T = initialState, action: Action): T => {
        return reducers.reduce((currentState, reducer) => reducer(currentState, action), state);
    };
};

export {chainReducers};
