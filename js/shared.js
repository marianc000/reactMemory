import { memory } from './memory.js';
 
export function execute(label, render) {
    return new Promise(async (resolve) => {
       const before= await memory(label + "_before");
        requestAnimationFrame(() => {
            render();
            setTimeout(async () => {
                 await memory(label + "_after");
                 resolve();
            });
        });
    });
}
 