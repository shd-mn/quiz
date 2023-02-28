import React, { useState } from 'react';
import { useGlobalContext } from '../context';

const Questions = () => {
    const { quiz, amount, handleAnswers, handleResult } = useGlobalContext();
    const [questionNum, setQuestionNum] = useState(0);
    return (
        <>
            <p className="quiz-count">
                Quiz {questionNum + 1}/{amount}
            </p>
            <article className="container">
                {<h2>{quiz[questionNum].question}</h2>}
                {quiz[questionNum].questions.map((answer, idx) => {
                    const question = quiz[questionNum].question;
                    return (
                        <div key={idx} className="btn-container">
                            <button
                                className={`answer-btn ${
                                    quiz[questionNum].your_answer === answer &&
                                    'btn-selected'
                                } `}
                                onClick={() => {
                                    handleAnswers(question, answer);
                                }}
                            >
                                {answer}
                            </button>
                        </div>
                    );
                })}
            </article>

            <div className="nav-btn-group">
                {questionNum > 0 && questionNum < quiz.length - 1 && (
                    <button
                        className="prev-question"
                        type="button"
                        onClick={() => {
                            setQuestionNum(questionNum - 1);
                        }}
                    >
                        prev question
                    </button>
                )}

                {questionNum < quiz.length - 1 && (
                    <button
                        className="next-question"
                        type="button"
                        onClick={() => {
                            setQuestionNum(questionNum + 1);
                        }}
                    >
                        next question
                    </button>
                )}
            </div>

            {questionNum === quiz.length - 1 && (
                <button
                    className="result-btn"
                    type="button"
                    onClick={() => {
                        handleResult();
                    }}
                >
                    see result
                </button>
            )}
        </>
    );
};

export default Questions;
