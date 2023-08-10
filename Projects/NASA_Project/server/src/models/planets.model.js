// importing built-ins from commonJS
const fs = require('fs');
const path = require('path');

// importing 3rd party library through npm installation
const { parse } = require('csv-parse');

const planetsCollection = require('./planets.mongo');

// const habitablePlanets = [];

function isHabitablePlanet(planet) {

    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;

}

/*
const promise = new Promise((resolve, reject) => {
    resolve(42);
});
promise.then((result) => {

});
const result = await promise;
console.log(result);
*/

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    // habitablePlanets.push(data);
                    /* await planets.create({
                        keplerName: data.kepler_name,
                    }); */
                    savePlanet(data);
                }
            })
            // pending - understand the parse functionallity and the listener function .on('data')
            // of the createReadStream() through testing - mark once done
            .on('end', async () => {
                // console.log(habitablePlanets.map((parameter_planet) => {
                //     return parameter_planet['habitablePlanets'];
                // }));
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitable planets found!`)
                // console.log('Done!');
                resolve();
            })
            .on('error', (err) => {
                console.log(err);
                reject();
            });
    });
}

// Data Access functions are part of layered arcitecture - https://www.vadimbulavin.com/layered-architecture-ios/
async function getAllPlanets() {
    // the mongoose find operation takes in filter as an object as argument
    return await planetsCollection.find({/*filter*/}, { /*projection*/
        '_id': 0, '__v': 0, // 0 indicates mongoose to exclude these properties in the documents
    }); // an empty object in filter parameter will return all the documents
}

async function savePlanet(planet) {
    // insert + update = upsert
    try {
        await planetsCollection.updateOne({
            keplerName: planet.kepler_name, // this statement checks if this field exists, if true then
        }, {
            keplerName: planet.kepler_name, // this statement updates the above field by populating it
        }, {
            upsert: true,
        });
    } catch(err) {
        console.error(`Could not save planet ${err}`);
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}