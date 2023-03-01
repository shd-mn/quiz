import React, { useContext, useReducer } from 'react';
import { reducer } from './reducer';

const table = {
    sports: 21,
    history: 23,
    politics: 24
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppContext = React.createContext();

const initialState = {
    quiz: [],
    isStart: false,
    isLoading: false,
    amount: 5,
    category: 21,
    difficulty: 'easy',
    result: 0,
    modalShow: false,
    error: { show: false, msg: '' }
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
                    payload: result.results
                });
            } else {
                dispatch({ type: 'HANDLE_ERROR', payload: result.response_code })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleStart = (e) => {
        e.preventDefault();
        fetchData(
            `${API_ENDPOINT}type=multiple&amount=${state.amount}&category=${state.category}&difficulty=${state.difficulty}`
        );
    };

    const handleAmount = (value) => {
        dispatch({ type: 'HANDLE_AMOUNT', payload: value });
    };

    const handleCategory = (value) => {
        switch (value) {
            case 'sports':
                value = table.sports;
                break;
            case 'history':
                value = table.history;
                break;
            case 'politics':
                value = table.politics;
                break;
            default:
                return;
        }
        dispatch({ type: 'HANDLE_CATEGORY', payload: value });
    };
    const handleDiffIuculty = (value) => {
        dispatch({ type: 'HANDLE_DIFFICULTY', payload: value });
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
        handleAmount,
        handleCategory,
        handleDiffIuculty,
        handleStart,
        handleAnswers,
        handleResult,
        handleReset
    };
    return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
