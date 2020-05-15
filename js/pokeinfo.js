import Pokedex from './pokedex.js';

const pokeinfo = {
	'render': async function pokeInfo(pokemon) {
		const body = document.querySelector('body');
		const ol = document.querySelector('ol');
		if(ol) body.removeChild(ol);
		const pokedata = await Pokedex.fetch(pokemon.url);
		const div = document.createElement('div');
		div.className = 'details';
	
		const pokeinfo_div = document.createElement('div');
		pokeinfo_div.className = 'container_pokeinfo';

		const intro_div = document.createElement('div');
		intro_div.className = 'container_intro';
		const img = document.createElement('img');
		img.src = pokedata.sprites.front_default;
		pokeinfo_div.append(img);
	

		const title = document.createElement('h2');
		title.innerText = '#' + pokedata.id + ': ' + pokedata.name;
		intro_div.append(title);
	
		const types = document.createElement('h3');
		types.innerText = `${pokedata.types[0].type.name}`;
		if(pokedata.types[1]) types.innerText += ` and ${pokedata.types[1].type.name}`;
		intro_div.append(types);
		pokeinfo_div.append(intro_div);
		div.append(pokeinfo_div);

		const stats_div = document.createElement('div');
		stats_div.className = 'container_stats';
		for(const stat of pokedata.stats) {
			const info = document.createElement('p');
			info.className = 'stats';
			info.innerText += `${stat.stat.name}:${stat.base_stat}`;
			stats_div.append(info);
		}
		div.append(stats_div);

		const abilities_div = document.createElement('div');
		abilities_div.className = 'container_abilities';
		for(const ability of pokedata.abilities){
			const info = document.createElement('p');
			info.className = 'abilities';
			info.innerText += ability.ability.name;
			abilities_div.append(info);
		}
		div.append(abilities_div);

		const games_div = document.createElement('div');
		games_div.className = 'container_games';
		for(const ability of pokedata.game_indices){
			const info = document.createElement('p');
			info.className = 'games';
			info.innerText += ability.version.name;
			games_div.append(info);
		}
		div.append(games_div);

		const move_div = document.createElement('div');
		move_div.className = 'container_moves';
		for(const move of pokedata.moves){
			const info = document.createElement('p');
			info.className = 'moves';
			info.innerText += move.move.name;
			move_div.append(info);
		}
		div.append(move_div);

		body.append(div);
	}
}

export default pokeinfo;