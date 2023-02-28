import { sortAnswers } from './sortanswers';

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING': {
            return { ...state, isLoading: true };
        }

        case 'HANDLE_START':
            return { ...state, isStart: true };
        case 'HANDLE_AMOUNT':
            return { ...state, amount: action.payload };
        case 'HANDLE_CATEGORY':
            return { ...state, category: action.payload };
        case 'HANDLE_DIFFICULTY':
            return { ...state, difficulty: action.payload };

        case 'SET_QUIZ':
            const newQuiz = sortAnswers(action.payload);
            return {
                ...state,
                quiz: [...newQuiz],
                isLoading: false,
                isStart: true
            };

        case 'HANDLE_ANSWERS': {
            const newQuiz = state.quiz.map((item) => {
                let newQuestion;
                if (item.question === action.payload.question) {
                    newQuestion = {
                        ...item,
                        your_answer: action.payload.answer
                    };
                } else {
                    newQuestion = item;
                }
                return newQuestion;
            });
            return { ...state, quiz: newQuiz };
        }
        case 'HANDLE_RESULT':
            const newResult = state.quiz.filter(
                (item) => item.your_answer === item.correct_answer
            ).length;

            return { ...state, result: newResult, modalShow: true };

        case 'HANDLE_RESET':
            return {
                ...state,
                quiz: [],
                isStart: false,
                isLoading: false,
                category: 21,
                difficulty: 'easy',
                result: 0,
                modalShow: false
            };
        default:
            throw new Error(`No matches ${action.type}`);
    }
};
