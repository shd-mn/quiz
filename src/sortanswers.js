export const sortAnswers = (quiz) => {
    const newQuiz = quiz.map((item) => {
        const newAnswers = [item.correct_answer, ...item.incorrect_answers];

        const random = Math.floor(Math.random() * 4);
        const randomAnswers = [];

        for (let i = 0; i < 4; i++) {
            if (random === i) {
                randomAnswers.push(newAnswers[0]);
            } else {
                if (i === 0) {
                    randomAnswers.push(newAnswers[random]);
                } else {
                    randomAnswers.push(newAnswers[i]);
                }
            }
        }

        return { ...item, questions: randomAnswers, your_answer: '' };
    });
    return newQuiz;
};
