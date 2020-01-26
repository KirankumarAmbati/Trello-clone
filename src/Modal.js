import React from 'react';

export default ({ handleClose, show, children }) => {
    let showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <button style={{ color: 'red', border: 0, fontSize: '26px', backgroundColor: 'snow' }} onClick={handleClose}>X</button>
                <div style={{ padding: '20px' }}>
                    {children}
                </div>
            </section>
        </div>
    );
};