import React, { useState } from 'react';
import Details from './Details';
import { useGlobalContext } from '../context';

const Modal = () => {
    const { result, input, modalShow, handleReset } = useGlobalContext();
    const [showDetails, setShowDetails] = useState(false);
    return (
        <div className={`modal-container ${modalShow && 'isOpen'}`}>
            <div className="modal-content">
                {!showDetails && (
                    <>
                        <h2>congrats!</h2>
                        <p>{`You answered ${((result * 100) / input.amount).toFixed(
                            0
                        )} % of questions correctly`}</p>
                    </>
                )}

                {showDetails && <Details />}
                <button className="close-btn" onClick={handleReset}>
                    play again
                </button>
                {!showDetails && (
                    <button
                        className="details-btn"
                        onClick={() => setShowDetails(true)}
                    >
                        see details
                    </button>
                )}
            </div>
        </div>
    );
};

export default Modal;
