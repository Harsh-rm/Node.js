// const planets = [];

// module.exports = planets;

// importing built-ins from commonJS
const fs = require('fs');
const path = require('path');

// importing 3rd party library through npm installation
const { parse } = require('csv-parse'); 

const results = [];

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
            .on('data', (data) => {
                if (isHabitablePlanet(data)){
                    results.push(data);
                }
            })
            .on('end', () => {
                // console.log(results.map((parameter_planet) => {
                //     return parameter_planet['kepler_name'];
                // }));
                console.log(`${results.length} habitable planets found!`)
                // console.log('Done!');
                resolve();
            })
            .on('error', (err) => {
                console.log(err);
                reject();
            });
    });
}

module.exports = {
    loadPlanetsData,
    planets: results,
}