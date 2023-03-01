import React, { useContext, useReducer } from 'react';
import { reducer } from './reducer';

const table = {

    books: 10,
    film: 11,
    music: 12,
    videogames: 15,
    computers: 18,
    mathematics: 19,
    sports: 21,
    history: 23,
    politics: 24,
    general: 9
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppContext = React.createContext();

const initialState = {
    quiz: [],
    isStart: false,
    isLoading: false,
    input: { amount: 5, category: 'books', difficulty: 'easy' },
    result: 0,
    modalShow: false,
    error: { show: false, msg: '' },
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async (url) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.response_code === 0) {
                dispatch({
                    type: 'SET_QUIZ',
                    payload: result.results,
                });
            } else {
                dispatch({
                    type: 'HANDLE_ERROR',
                    payload: result.response_code,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleStart = (e) => {
        e.preventDefault();
        fetchData(
            `${API_ENDPOINT}type=multiple&amount=${state.input.amount}&category=${table[state.input.category]}&difficulty=${state.input.difficulty}`
        );
    };

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch({ type: 'HANDLE_INPUT', payload: { name, value } });
    };

    const handleAnswers = (question, answer) => {
        dispatch({ type: 'HANDLE_ANSWERS', payload: { question, answer } });
    };

    const handleResult = () => {
        dispatch({ type: 'HANDLE_RESULT' });
    };

    const handleReset = () => {
        dispatch({ type: 'HANDLE_RESET' });
    };

    const data = {
        ...state,
        handleStart,
        handleAnswers,
        handleResult,
        handleReset,
        handleInputs,
    };
    return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
