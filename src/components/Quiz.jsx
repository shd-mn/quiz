import { useGlobalContext } from '../context';
import Questions from './Questions';
import SetupForm from './SetupForm';

const Quiz = () => {
    const { isStart } = useGlobalContext();
    return (
        <section className={`${isStart ? 'quiz' : 'quiz quiz-small'}`}>
            {!isStart && <SetupForm />}
            {isStart && <Questions />}
          
        </section>
    );
};

export default Quiz;
