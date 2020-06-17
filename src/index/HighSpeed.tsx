import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './HighSpeed.css';

type propType = {
    highSpeed: boolean,
    toggle: () => void,
}
export default function HighSpeed(props: propType) {
    const {
        highSpeed,
        toggle,
    } = props;

    return (
        <div className="high-speed">
            <div className="high-speed-label">只看高铁/动车</div>
            <div className="high-speed-switch" onClick={() => toggle()}>
                <input type="hidden" name="highSpeed" value={String(highSpeed)}/>
                <div className={classNames('high-speed-track', {
                    checked: highSpeed,
                })}>
                    <span className={classNames('high-speed-handle', {
                        checked: highSpeed,
                    })}>
                    </span>
                </div>
            </div>
        </div>
    );
}

HighSpeed.propTypes = {
    highSpeed: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
};
