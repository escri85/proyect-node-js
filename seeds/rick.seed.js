
const axios = require('axios');
const mongoose = require('mongoose');
const Rick = require('../models/Rick');
const { DB_URL, CONFIG_DB } = require('../utils/db');

const getRickData = async () => {
    const response = await axios('https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=96&APIkey=dd5c165c35141a144c3e4cbfa8a08b216ebc4b645fd84d35ccc8cead75bd1e34');

    const ricks = response.data.results;
    console.log(ricks);

    runSeed(ricks);
};

getRickData();



const runSeed = (personajesList) => {
    mongoose.connect(DB_URL, CONFIG_DB)
        .then(async () => {
            console.log('Ejecutando seed de rick...');
           
            const allPersonajes = await Rick.find();
           
            if (allPersonajes.length) {
                await Rick.collection.drop();
                console.log('Colección  eliminada con éxito');
            }
        })
        .catch(error => console.log('Error buscando en la DB', error))
        .then(async () => {
            
            await Rick.insertMany(personajesList);
            console.log('Añadidos nuevos personajes a DB');
        })
        .catch(error => console.log('Error añadiendo los nuevos personajes', error))
        
        .finally(() => mongoose.disconnect());
}




