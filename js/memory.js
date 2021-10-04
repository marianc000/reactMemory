import { MB } from './constants.js';

let history = [];

export function getHistory() {
    return history;
}

export async function memory(title) {
    if (title === 'baseline') history = [];
    return performance.measureUserAgentSpecificMemory()
        .then(obj => {
            const memoryMB = obj.bytes / MB;
            console.log(title, memoryMB.toFixed(3));
            history.push([title, memoryMB]);
        });
}


