import React from 'react';

import './personastate.css';

const Personastate = ({state}) => {
    let textCls = 'text-info', translation = 'Unknown';
    switch (state) {
        case 0:
            textCls = 'text-secondary';
            translation = 'Offline';
            break;
        case 1:
            textCls = 'text-success';
            translation = 'Online';
            break;
        case 2:
            textCls = 'text-danger';
            translation = 'Busy';
            break;
        case 3:
            textCls = 'text-warning';
            translation = 'Away';
            break;
        case 4:
            textCls = 'text-primary';
            translation = 'Snooze';
            break;
        case 5:
            textCls = 'text-success';
            translation = 'Looking to trade';
            break;
        case 6:
            textCls = 'text-success';
            translation = 'Looking to play';
            break;
    }
    return (<span className={textCls}>{translation}</span>);
};

export default Personastate;