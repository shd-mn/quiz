import { useGlobalContext } from '../context';
import { decode } from 'html-entities';
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
                            className={`${your === correct
                                ? 'correct-question'
                                : 'incorrect_question'
                                }`}
                        >
                            <h4 className="question">{decode(answer.question)}</h4>
                            <h6 className="answer">
                                <span>correct answer :</span>  {correct}
                            </h6>
                            <h6 className="answer"> <span>your answer :</span> {your}</h6>
                        </div>
                    );
                })}
        </>
    );
};

export default Details;
