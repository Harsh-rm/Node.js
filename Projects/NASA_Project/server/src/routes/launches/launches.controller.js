const { 
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
    // .values() is a functionallity of the map object which provides an IterableIterator<any> object
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate); 
    if (isNaN(launch.launchDate)) { //this is anther way to check for date object -> use node repl with example
        // this function calls arg.valueOf() by default which returns a number corresponding to the UNIX timestamp
        // Date() returns 'Invalid Date' if the cannot convert the arg to date
        // if(launch.launchDate.toString() === 'Invalid Date')
        return res.status(400).json({
            error: 'Invalid launch date'
        });
    }

    addNewLaunch(launch);

    return res.status(201).json(launch);
    
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    //if launchId does not exist
    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: "LaunchId not found",
        });
    }

    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}