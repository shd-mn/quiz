import { useGlobalContext } from '../context';
const Details = () => {
    const { quiz } = useGlobalContext();
    return (
        <>
            <h2>Details</h2>
            {quiz.length > 0 &&
                quiz.map((answer, idx) => {
                    const correct = answer.correct_answer;
                    const your = answer.your_answer;
                    return (
                        <div
                            key={idx}
                            className={`${
                                your === correct
                                    ? 'correct-question'
                                    : 'incorrect_question'
                            }`}
                        >
                            <h4 className="question">{answer.question}</h4>
                            <h6 className="answer">
                                correct answer: {correct}
                            </h6>
                            <h6 className="answer">your answer: {your}</h6>
                        </div>
                    );
                })}
        </>
    );
};

export default Details;
