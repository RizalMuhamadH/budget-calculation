import { writable } from 'svelte/store';

export const expanses = writable([]);
export const calculate = writable({ total: 0, month: 0, year: 0 });