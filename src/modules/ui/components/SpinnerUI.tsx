import React from 'react';
import spinnerImg from '../../../assets/img/spinner.gif';

/**
 * The loading spinner component (static)
 * @constructor
 */
const SpinnerUI = () => {
    return (
        <>
            <div className="spinner-ui">
                <img src={spinnerImg} alt="" className="m-auto text-center d-block"/>
            </div>
        </>
    );
};
export default SpinnerUI;