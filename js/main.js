import 'https://unpkg.com/react@17/umd/react.production.min.js';
import 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js';
import run from './benchmarking.js';

import { render as react, clear as rclear } from './approaches/react.js';
import { render as noreact, clear } from './approaches/noreact.js';
import data from './data.js';

const approaches = { noreact, react };

startBtn.onclick = () => {
    controls.remove();
    run();
}

const buttons = document.querySelectorAll('button[name]');
buttons.forEach(btn => btn.onclick = onClick);

let previousApproach;

export function clearScreen() {
    if (previousApproach && previousApproach === 'react')
        rclear();
    else
        clear();
}

function onClick() {
    buttons.forEach(btn => btn.className = (btn === this ? 'selected' : ''));
    clearScreen();
    approaches[this.name](data);
    previousApproach = this.name;
}
