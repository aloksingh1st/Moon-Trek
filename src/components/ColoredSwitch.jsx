import React from 'react';
import './ColoredSwitch.css';

const ColoredSwitch = ({ isOn, handleToggle, color, label }) => {
    return (
        <div className="switch-container">
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={`react-switch-${label}`}
                type="checkbox"
            />
            <label
                style={{ '--switch-color': color }}
                className="react-switch-label"
                htmlFor={`react-switch-${label}`}
            >
                <span className="react-switch-button" />
                <span className="switch-label">{label}</span>
            </label>
        </div>
    );
};

export default ColoredSwitch; 