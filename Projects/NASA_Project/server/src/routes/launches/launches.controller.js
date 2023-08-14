const { 
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
} = require('../../models/launches.model');

const { 
    getPagination,
 } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
    // console.log(req.query);
    const { skip, limit } = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
    // .values() is a functionallity of the map object which provides an IterableIterator<any> object
}

async function httpAddNewLaunch(req, res) {
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

    await addNewLaunch(launch);
    // console.log(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    const existsLaunch = await existsLaunchWithId(launchId)

    //if launchId does not exist
    if (!existsLaunch) {
        return res.status(404).json({
            error: "LaunchId not found",
        });
    }

    const aborted = await abortLaunchById(launchId);

    if(!aborted) {
        return res.status(400).json({
            error: "Abort not successful!",
        });
    }

    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}