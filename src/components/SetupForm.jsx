import React from 'react';
import { useGlobalContext } from '../context';

const SetupForm = () => {
    const { error, input, handleStart, handleInputs } = useGlobalContext();

    return (
        <form className="setup-form" onSubmit={(e) => handleStart(e)}>
            <h2>Setup Quiz</h2>
            <div className="form-control">
                <label htmlFor="amount">number of questions</label>
                <input
                    className="form-input"
                    name="amount"
                    id="amount"
                    type="number"
                    min="1"
                    max="50"
                    value={input.amount}
                    onChange={(e) => {
                        handleInputs(e);
                    }}
                />
            </div>
            <div className="form-control">
                <label htmlFor="category">Category</label>
                <select
                    className="form-input"
                    name="category"
                    id="category"
                    value={input.category}
                    onChange={(e) => handleInputs(e)}
                >
                    <option value="books">books</option>
                    <option value="film">film</option>
                    <option value="music">music</option>
                    <option value="videogames">video games</option>
                    <option value="computers">computers</option>
                    <option value="mathematics">mathematics</option>
                    <option value="sports">sports</option>
                    <option value="history">history</option>
                    <option value="politics">politics</option>
                    <option value="general">general</option>
                </select>
            </div>

            <div className="form-control">
                <label htmlFor="difficulty">Select Difficulty</label>
                <select
                    className="form-input"
                    name="difficulty"
                    id="difficulty"
                    onChange={(e) => handleInputs(e)}
                    value={input.difficulty}
                >
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                </select>
            </div>
            {error.show && <p className="error">{error.msg}</p>}

            <button className="submit-btn" type="submit">
                start
            </button>
        </form>
    );
};

export default SetupForm;
