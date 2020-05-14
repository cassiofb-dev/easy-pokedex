const url = 'https://pokeapi.co/api/v2/';

const Pokedex = {
	'help': 'https://pokeapi.co/docs/v2.html',

	'pokemons': async () => {
		const response = await fetch(`${url}pokemon/?offset=0&limit=1000`);
		const json = await response.json();
		return json.results;
	},
	
	'fetch': async (input) => {
		const response = await fetch(input);
		const json = await response.json();
		return json;
	},
}

export default Pokedex;