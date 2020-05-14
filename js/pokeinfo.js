import Pokedex from './pokedex.js';

const pokeinfo = {
	'render': async function pokeInfo(pokemon) {
		const body = document.querySelector('body');
		const ol = document.querySelector('ol');
		if(ol) body.removeChild(ol);
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
}

export default pokeinfo;