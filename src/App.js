import React from 'react';
import { useGlobalContext } from './context';

import Loading from './components/Loading';
import Quiz from './components/Quiz';
import Modal from './components/Modal';
function App() {
    const { isLoading, modalShow } = useGlobalContext();
    if (isLoading) {
        return <Loading />;
    }
    return (
        <main>
            <Quiz />
            {modalShow && <Modal />}
        </main>
    );
}

export default App;
