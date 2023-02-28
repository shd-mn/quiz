import React, { useContext, useReducer } from 'react';
import { reducer } from './reducer';

const table = {
    sports: 21,
    history: 23,
    politics: 24
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

// const url = 'https://opentdb.com/api.php?type=multiple&amount=5&category=21&difficulty=easy';


const AppContext = React.createContext();

const initialState = {
    quiz: [],
    isStart: false,
    isLoading: false,
    amount: 5,
    category: 21,
    difficulty: 'easy',
    result: 0,
    modalShow: false
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async (url) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const response = await fetch(url);
            const result = await response.json();
            dispatch({
                type: 'SET_QUIZ',
                payload: result.results
            });
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
    // console.log(state.quiz);

    // console.log(state);

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
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
