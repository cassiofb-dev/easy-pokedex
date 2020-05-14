import Pokelist from './js/pokelist.js';

const data = [];
Pokelist.load(data);

const form = document.querySelector('form');
form.addEventListener('submit', e => Pokelist.update(e,data));