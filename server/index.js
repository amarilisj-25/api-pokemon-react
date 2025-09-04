const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001; // El puerto del backend

app.use(cors());
app.use(bodyParser.json());

// Base de datos "falsa" en memoria
let pokemons = [
    { id: 1, name: 'Pikachu', type: 'Electric', description: 'Pokémon de tipo eléctrico, famoso por su cola con forma de rayo.', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png' },
    { id: 2, name: 'Charmander', type: 'Fire', description: 'Pokémon de tipo fuego, su cola arde con una llama.', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png' },
    { id: 3, name: 'Bulbasaur', type: 'Grass/Poison', description: 'Pokémon tipo planta/veneno. Puede absorber luz solar.', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png' },
    { id: 4, name: 'Squirtle', type: 'Water', description: 'Pokémon tipo agua. Puede disparar agua desde su boca.', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png' }
];

// Rutas de la API (CRUD)

// Obtener todos los Pokémon (GET)
app.get('/api/pokemons', (req, res) => {
    res.json(pokemons);
});

// Obtener un Pokémon por ID (GET)
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(p => p.id === id);
    if (pokemon) {
        res.json(pokemon);
    } else {
        res.status(404).send('Pokémon no encontrado');
    }
});

// Agregar un nuevo Pokémon (POST)
app.post('/api/pokemons', (req, res) => {
    const newPokemon = {
        id: pokemons.length > 0 ? Math.max(...pokemons.map(p => p.id)) + 1 : 1,
        ...req.body
    };
    pokemons.push(newPokemon);
    res.status(201).json(newPokemon);
});

// Actualizar un Pokémon (PUT)
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonIndex = pokemons.findIndex(p => p.id === id);
    if (pokemonIndex !== -1) {
        pokemons[pokemonIndex] = { id, ...req.body };
        res.json(pokemons[pokemonIndex]);
    } else {
        res.status(404).send('Pokémon no encontrado');
    }
});

// Eliminar un Pokémon (DELETE)
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pokemons = pokemons.filter(p => p.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});