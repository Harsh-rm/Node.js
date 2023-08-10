const launchesCollection = require('./launches.mongo');
const planetsCollection = require('./planets.mongo');

// const launches = new Map(); // Map(<any>, <any>)
// Map() objects in javascript are not Javascript Objects Notations (JSON)

// let latestFlightNumber = 100;
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'Johannes Kepler Exploration',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

// launches.set(launch.flightNumber, launch);

// we implement data access functions to abstract the data representation 
// in the model from the routers
async function existsLaunchWithId(launchId) {
    return await launchesCollection.findOne({
        flightNumber: launchId,
    });
    // return launches.has(launchId);
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesCollection
        .findOne()
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await launchesCollection.find({}, {
        _id: 0, __v: 0,
    });
    // return Array.from(launches.values());
}

async function saveLaunch(launch) {
    const planet = await planetsCollection.findOne({
        keplerName: launch.target,
    });
    if (!planet) {
        throw new Error('No matching planet was found!');
    }
    try {
        await launchesCollection.findOneAndUpdate({ // Saving one launch at a time
            // updateOne - sets a setOnInsert property to the document {object}
            // which we want to avoid to send it to the client, as it revels the database info.
            flightNumber: launch.flightNumber,
        }, launch, {
            upsert: true,
        })
    } catch(err) {
        console.log(`Could not save launch ${save}`);
    }
}

async function addNewLaunch(launch) {
    // latestFlightNumber++;
    // launches.set(latestFlightNumber, Object.assign(launch, {
    //     flightNumber: latestFlightNumber,
    //     customers: ['ZTM', 'NASA'],
    //     upcoming: true,
    //     success: true,
    // }));
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightNumber,
        customers: ['ZTM', 'NASA'],
        upcoming: true,
        success: true,
    });

    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
    // const aborted = launches.get(launchId);
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted;
    const aborted = await launchesCollection.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifideCount === 1;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
};