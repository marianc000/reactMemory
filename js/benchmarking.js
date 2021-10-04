// benchmarking.js
import { render as rrender, clear as rclear } from './approaches/react.js';
import { render, clear } from './approaches/noreact.js';
import { data, data2 } from './data.js';
import { execute } from './shared.js';
import { memory, getHistory } from './memory.js';
import { clearScreen } from './main.js';

function promise(func) {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            func();
            setTimeout(resolve);
        });
    });
}

function plot(data) {
    import('./plot.js')
        .then(({ plot, COLORS: { green, red, orange, purple } }) => plot(data, [green, red, orange, red, purple, orange, purple]));
}

const noreact = () => render(data);
const noreact2 = () => render(data2);
const empty = () => promise(clear);

const react = () => rrender(data);
const react2 = () => rrender(data2);
const rempty = () => promise(rclear);

export default function run() {
    const times =1;

    let p = Promise.resolve().then(() => promise(clearScreen)).then(memory('baseline'));

    for (let i = 0; i < times; i++) {
        p = p.then(() => execute('noreact', noreact))
            .then(empty);
    }

    for (let i = 0; i < times; i++) {
        p = p.then(() => execute('react', react))
            .then(rempty);
    }

    p.then(() => promise(() => chart.style.display = 'block'))
        .then(() => {
            plot(getHistory());
        });

}