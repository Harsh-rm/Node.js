const { parse } = require('csv-parse'); 
// csv-parse is a npm package that parses csv files with the {parse} function
const fs = require('fs');

const results = [];

function isHabitablePlanet(planet) {
// https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/
// read the article above to find the conditions for a planet to be habitable from the csv files
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;

}

fs.createReadStream('kepler_data.csv')
// read stream of the file system module returns a buffer of data or bytes of data
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
// pipe function connects the two streams (read and parse)
// it is used to connect a readable stream source to a writable stream destination
    .on('data', (data) => {
        if (isHabitablePlanet(data)){
            results.push(data);
        }
    })
    .on('end', () => {
        console.log(results.map((parameter_planet) => {
            return parameter_planet['kepler_name'];
        }));
        console.log(`${results.length} habitable planets found!`)
// refer https://phl.upr.edu/projects/habitable-exoplanets-catalog to compare the results
        console.log('Done!');
    })
    .on('error', (err) => {
        console.log(err);
    });
