const { planets } = require('../../models/planets.model');

function getAllPlanets(req, res) {
    return res.status(200).json(planets);
    // the return value is not really used by express
    // as it takes only a single response we return it
    // this makes sure the function stops executing
}

module.exports = {
    getAllPlanets,
};