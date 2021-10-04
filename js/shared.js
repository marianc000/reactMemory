import {memory } from './memory.js';
import data from './data.js';


// export function memory(title) {
//     return promise(() => recordMemory(title));
// }

export function execute(label, render) {
    return new Promise(async (resolve) => {
        const before = await memory(label + "_before");
        requestAnimationFrame(() => {
            render(data);
            setTimeout(async () => {
                await memory(label + "_after");
                resolve();
            });
        });
    });
}
