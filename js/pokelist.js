import Pokedex from './pokedex.js';
import Pokeinfo from './pokeinfo.js';

const pokelist = {
	'update': async function update(event, data) {
		event.preventDefault();
		const body = document.querySelector('body');
		const old_ol = document.querySelector('ol');
		if(old_ol) body.removeChild(old_ol);
		const form = document.querySelector('form');
		const div = document.querySelector('div');
		const ol = document.createElement('ol');
		if(div) body.removeChild(div);
		const formData = new FormData(form);
		const search = formData.get('searchTerm');
		for(const pokemon of data[0]){
			if(pokemon.name.indexOf(search) > -1 || !search){
				const li = document.createElement('li');
				li.textContent = pokemon.name;
				li.addEventListener('click', () => Pokeinfo.render(pokemon));
				ol.append(li);
			}
		}
		body.append(ol);
	},
	
	'load': async function load(data){
		const body = document.querySelector('body');
		const ol = document.createElement('ol');
		data.push(await Pokedex.pokemons());
		for(const pokemon of data[0]){
			const li = document.createElement('li');
			li.textContent = pokemon.name;
			li.addEventListener('click', () => Pokeinfo.render(pokemon));
			ol.append(li);
		}
		body.append(ol);
	}
}

export default pokelist;