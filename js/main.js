import run from './benchmarking.js';

import { render as react, clear as rclear } from './approaches/react.js';
import { render as noreact, clear } from './approaches/noreact.js';
import * as datas from './data.js';

const approaches = { noreact, react };
 
startBtn.onclick = () => {
    controls.remove();
    run();
}

const buttons = document.querySelectorAll('button[data-approach]');
buttons.forEach(btn => btn.onclick = onClick);

let previousApproach;

export function clearScreen() {
    if (previousApproach && previousApproach === 'react')
        rclear();
    else
        clear();
}

function onClick() {
    const params = this.dataset;
    buttons.forEach(btn => btn.className = (btn === this ? 'selected' : ''));
    clearScreen();
    approaches[params.approach](datas[params.data]);
    previousApproach = params.approach;
}
