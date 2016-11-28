import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';
import Promise from 'bluebird';
import _ from 'lodash';
// import canonize from './canonize';

const __DEV__ = true;

const app = express();
app.use(cors());

// app.get('/canonize', (req, res) => {
//   const username = canonize(req.query.url); 
//   res.json({
//     url: req.query.url,
//     username,
//   });
// });

const baseUrl = 'https://pokeapi.co/api/v2';
const pokemonFields = ['id', 'name', 'weight', 'height'];
const pokemonFieldsFinish = ['name'];

// pokemon
// pokemon/1

async function getPokemons(url, i = 0) {
  console.log('getPokemons', url, i);
  const responce = await fetch(url);
  const page = await responce.json();
  const pokemons = page.results;
  if (__DEV__ && i > 1) {
    return pokemons;
  }
  if (page.next) {
    const pokemon2 = await getPokemons(page.next, i + 1);
    return [
      ...pokemons,
      ...pokemon2,
    ];
  }
  return pokemons;
}

async function getPokemon(url) {
  console.log(url);
  const responce = await fetch(url);
  const pokemon = await responce.json();
  return pokemon;
}

// //const pokemonsUrl = `${baseUrl}/pokemon/`;
// //getPokemons(pokemonsUrl).then((pokemons) => {
// //  console.log(pokemons.length);
// //});

app.get('/heavy', async (req, res) => {
  const limit = req.query.limit ? +req.query.limit : 20;
  const offset = req.query.offset ? +req.query.offset : 0;
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonPromises = pokemonsInfo.map((info) => {
      return getPokemon(info.url);
    });
    const pokemonsFull = await Promise.all(pokemonPromises);

    const pokemons = pokemonsFull.map((pokemon) => {
      return _.pick(pokemon, pokemonFields);
    });
    const sortPokemons = _.orderBy(pokemons, ['weight', 'name'], ['desc', 'asc']);
    const slPokemons = sortPokemons.slice(offset, offset + limit);
    const resPokemons = slPokemons.map((pokemon) => {
      return _.pick(pokemon, pokemonFieldsFinish);
    });
    console.log('!!!!');
    return res.json(resPokemons);
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

app.get('/light', async (req, res) => {
  const limit = req.query.limit ? +req.query.limit : 20;
  const offset = req.query.offset ? +req.query.offset : 0;
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonPromises = pokemonsInfo.map((info) => {
      return getPokemon(info.url);
    });
    const pokemonsFull = await Promise.all(pokemonPromises);

    const pokemons = pokemonsFull.map((pokemon) => {
      return _.pick(pokemon, pokemonFields);
    });
    const sortPokemons = _.orderBy(pokemons, ['weight', 'name'], ['asc', 'asc']);
    const slPokemons = sortPokemons.slice(offset, offset + limit);
    const resPokemons = slPokemons.map((pokemon) => {
      return _.pick(pokemon, pokemonFieldsFinish);
    });
    console.log('!!!!');
    return res.json(resPokemons);
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

app.get('/angular', async (req, res) => {
  const limit = req.query.limit ? +req.query.limit : 20;
  const offset = req.query.offset ? +req.query.offset : 0;
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonPromises = pokemonsInfo.map((info) => {
      return getPokemon(info.url);
    });
    const pokemonsFull = await Promise.all(pokemonPromises);

    const pokemons = pokemonsFull.map((pokemon) => {
      return _.pick(pokemon, pokemonFields);
    });
    for (let i = 0; i < pokemons.length; i += 1) {
      const element = pokemons[i];
      element.angular = Number(element.weight) / Number(element.height);
    }
    const sortPokemons = _.orderBy(pokemons, ['angiular', 'name'],['asc', 'asc']);
    const slPokemons = sortPokemons.slice(offset, offset + limit);
    const resPokemons = slPokemons.map((pokemon) => {
      return _.pick(pokemon, pokemonFieldsFinish);
    });
    console.log('!!!!');
    return res.json(resPokemons);
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

app.get('/huge', async (req, res) => {
  const limit = req.query.limit ? +req.query.limit : 20;
  const offset = req.query.offset ? +req.query.offset : 0;
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonPromises = pokemonsInfo.map((info) => {
      return getPokemon(info.url);
    });
    const pokemonsFull = await Promise.all(pokemonPromises);

    const pokemons = pokemonsFull.map((pokemon) => {
      return _.pick(pokemon, pokemonFields);
    });
    const sortPokemons = _.orderBy(pokemons, ['height', 'name'], ['desc', 'asc']);
    const slPokemons = sortPokemons.slice(offset, offset + limit);
    const resPokemons = slPokemons.map((pokemon) => {
      return _.pick(pokemon, pokemonFieldsFinish);
    });
    console.log('!!!!');
    return res.json(resPokemons);
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

app.get('/micro', async (req, res) => {
  const limit = req.query.limit ? +req.query.limit : 20;
  const offset = req.query.offset ? +req.query.offset : 0;
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonPromises = pokemonsInfo.map((info) => {
      return getPokemon(info.url);
    });
    const pokemonsFull = await Promise.all(pokemonPromises);

    const pokemons = pokemonsFull.map((pokemon) => {
      return _.pick(pokemon, pokemonFields);
    });
    const sortPokemons = _.orderBy(pokemons, ['height', 'name'], ['asc', 'asc']);
    const slPokemons = sortPokemons.slice(offset, offset + limit);
    const resPokemons = slPokemons.map((pokemon) => {
      return _.pick(pokemon, pokemonFieldsFinish);
    });
    console.log('!!!!');
    return res.json(resPokemons);
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

app.get('/fat', async (req, res) => {
  const limit = req.query.limit ? +req.query.limit : 20;
  const offset = req.query.offset ? +req.query.offset : 0;
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonPromises = pokemonsInfo.map((info) => {
      return getPokemon(info.url);
    });
    const pokemonsFull = await Promise.all(pokemonPromises);

    const pokemons = pokemonsFull.map((pokemon) => {
      return _.pick(pokemon, pokemonFields);
    });
    for (let i = 0; i < pokemons.length; i += 1) {
      const element = pokemons[i];
      element.fat = Number(element.weight) / Number(element.height);
    }
    const sortPokemons = _.orderBy(pokemons, ['fat', 'name'], ['asc', 'asc']);
    const slPokemons = sortPokemons.slice(offset, offset + limit);
    const resPokemons = slPokemons.map((pokemon) => {
      return _.pick(pokemon, pokemonFieldsFinish);
    });
    console.log('!!!!');
    return res.json(resPokemons);
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});


app.get('/', async (req, res) => {
  const limit = req.query.limit ? +req.query.limit : 20;
  const offset = req.query.offset ? +req.query.offset : 0;
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonPromises = pokemonsInfo.map((info) => {
      return getPokemon(info.url);
    });
    const pokemonsFull = await Promise.all(pokemonPromises);

    const pokemons = pokemonsFull.map((pokemon) => {
      return _.pick(pokemon, pokemonFields);
    });
    const sortPokemons = _.sortBy(pokemons, pokemon => pokemon.name);
    const slPokemons = sortPokemons.slice(offset, offset + limit);
    const resPokemons = slPokemons.map((pokemon) => {
      return _.pick(pokemon, pokemonFieldsFinish);
    });
    console.log('!!!!');
    return res.json(resPokemons);
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
  // return res.send('OK');
});

app.listen(3000, () => {
  console.log('Express server on port 3000!');
});


