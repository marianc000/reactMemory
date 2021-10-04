// benchmarking.js
import { render as react, clear as rclear } from './approaches/react.js';
import { render as noreact, clear } from './approaches/noreact.js';

import { execute } from './shared.js';
import { getHistory, memory } from './memory.js';
import { clearScreen } from './main.js';

function plot(data) {
    console.log(data);
    import('./plot.js')
        .then(({ plot, COLORS: { green, red,blue, orange, purple } }) => {
            const colors=data.map((v,i,ar)=>{
                if(i<times*2){
                    return i%2===0?red:orange;
                }
                return (i%2===0||i===ar.length-1)?blue:purple;
            })
                plot(data, colors);
        });
}

function promise(func) {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            func();
            setTimeout(resolve);
        });
    });
}

const empty = () => promise(clear);
const rempty = () => promise(rclear);

// needed for react, react nulls previously displayed nodes not immediately but in the next frame
const skipFrame = () => promise(() => 0);
const times = 3;

export default function run() {


    let p = Promise.resolve().then(() => promise(clearScreen))
        .then(skipFrame);

    for (let i = 0; i < times; i++) {
        p = p.then(() => execute('noreact', noreact))
            .then(empty).then(skipFrame);
    }

    for (let i = 0; i < times; i++) {
        p = p.then(() => execute('react', react))
            .then(rempty).then(skipFrame);
    }

    p.then(() => memory('end'))
        .then(() => promise(() => chart.style.display = 'block'))
        .then(() => {
            plot(getHistory());
        });
}