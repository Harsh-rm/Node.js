const { getAllPlanets } = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
    return res.status(200).json(await getAllPlanets()); // an array or JS object is accepted as a valid .json()
    // the return value is not really used by express as it takes only a single response we return it
    // this makes sure the function stops executing
}

module.exports = {
    httpGetAllPlanets,
};