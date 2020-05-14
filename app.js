import Pokedex from './pokedex.js';

const pokemons = [];
const body = document.querySelector('body');
const form = document.querySelector('form');
const ol = document.createElement('ol');

loadPokemons();

body.append(form);
form.addEventListener('submit', update);

console.log(pokemons);

async function update(event) {
	event.preventDefault();
	const div = document.querySelector('div');
	if(div) body.removeChild(div);
	body.append(ol);
	const formData = new FormData(form);
	const search = formData.get('searchTerm');
	ol.innerHTML = '';
	for(const pokemon of pokemons[0]){
		if(pokemon.name.indexOf(search) > -1 || !search){
			const li = document.createElement('li');
			li.textContent = pokemon.name;
			li.addEventListener('click', () => pokeInfo(pokemon));
			ol.append(li);
		}
	}
}

async function loadPokemons(){
	pokemons.push(await Pokedex.pokemons());
	body.append(ol);
	for(const pokemon of pokemons[0]){
		const li = document.createElement('li');
		li.textContent = pokemon.name;
		li.addEventListener('click', () => pokeInfo(pokemon));
		ol.append(li);
	}
}

async function pokeInfo(pokemon) {
	body.removeChild(ol);
	const pokedata = await Pokedex.fetch(pokemon.url);
	const div = document.createElement('div');
	
	// Conrado's mod
	div.className += 'details';

	const img = document.createElement('img');
	img.src = pokedata.sprites.front_default;
	div.append(img);

	const title = document.createElement('h2');
	title.innerText = pokedata.id + ' : ' + pokedata.name;
	div.append(title);

	const types = document.createElement('h3');
	types.innerText = `${pokedata.types[0].type.name}`;
	if(pokedata.types[1]) types.innerText += ` and ${pokedata.types[1].type.name}`;
	div.append(types);

	const info = document.createElement('p');
	for(const stat of pokedata.stats) {
		info.innerText += `| ${stat.stat.name}:${stat.base_stat} |`;
	}
	div.append(info);
	body.append(div);
}