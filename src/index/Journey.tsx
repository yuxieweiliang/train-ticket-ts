import React, { ReactNode, FC } from 'react';
import PropTypes from 'prop-types';

import switchImg from './imgs/switch.svg';
import './Journey.css';

type journeyProp = {
    from: string
    to: string
    exchangeFromTo: () => any
    showCitySelector: (arg: any) => any
}

const Journey:FC<journeyProp> = (props: journeyProp) => {
    const {
        from,
        to,
        exchangeFromTo,
        showCitySelector,
    } = props;

    console.log(from, to)
    return (
        <div className="journey">
            <div
                className="journey-station"
                onClick={() => showCitySelector(true)}
            >
                <input
                    type="text"
                    readOnly
                    name="from"
                    value={from}
                    className="journey-input journey-from"
                />
            </div>
            <div className="journey-switch" onClick={() => exchangeFromTo()}>
                <img src={switchImg} width="70" height="40" alt="switch"/>
            </div>
            <div
                className="journey-station"
                onClick={() => showCitySelector(false)}
            >
                <input
                    type="text"
                    readOnly
                    name="to"
                    value={to}
                    className="journey-input journey-to"
                />
            </div>
        </div>
    );
}
Journey.propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    exchangeFromTo: PropTypes.func.isRequired,
    showCitySelector: PropTypes.func.isRequired,
}

export default Journey
