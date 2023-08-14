const axios = require('axios');

const launchesCollection = require('./launches.mongo');
const planetsCollection = require('./planets.mongo');

// const launches = new Map(); // Map(<any>, <any>)
// Map() objects in javascript are not Javascript Objects Notations (JSON)

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

// let latestFlightNumber = 100;
const DEFAULT_FLIGHT_NUMBER = 100;

// marking w.r.t SpaceX API response
// const launch = {
//     flightNumber: 100, // flight_number
//     mission: 'Johannes Kepler Exploration', // name
//     rocket: 'Explorer IS1', // rocket.name
//     launchDate: new Date('December 27, 2030'), // date_local
//     target: 'Kepler-442 b', // N/A
//     customers: ['ZTM', 'NASA'], // payloads[].customers 
//     upcoming: true, // upcoming
//     success: true, // success
// };

// TODO: learn how this save is performed, check when the launches.model script runs
// saveLaunch(launch);

async function populateLaunches() {

    console.log('Dowloading launch data from SpaceX API...');

    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                }, 
                {
                    path: 'payloads',
                    select: {
                        customers: 1,
                    }
                }
            ]
        }
    });

    if (response.status !== 200) {
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed!');
    }

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads =  launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        };

        console.log(`${launch.flightNumber} ${launch.mission}`);

        await saveLaunch(launch);
    }
}

async function findLaunch(filter) {
    return await launchesCollection.findOne(filter);
}

// launches.set(launch.flightNumber, launch);

// we implement data access functions to abstract the data representation 
// in the model from the routers
async function existsLaunchWithId(launchId) {
    return await findLaunch({
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

async function loadLaunchesData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });
    if (firstLaunch) {
        console.log('Launch data already loaded!');
    } else {
        await populateLaunches();
    }
}

async function getAllLaunches(skip, limit) {
    return await launchesCollection
    .find({}, {_id: 0, __v: 0,})
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
    // return Array.from(launches.values());
}

async function saveLaunch(launch) {
    await launchesCollection.findOneAndUpdate({ // Saving one launch at a time
        // updateOne - sets a setOnInsert property to the document {object}
        // which we want to avoid to send it to the client, as it revels the database info.
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function addNewLaunch(launch) {
    // latestFlightNumber++;
    // launches.set(latestFlightNumber, Object.assign(launch, {
    //     flightNumber: latestFlightNumber,
    //     customers: ['ZTM', 'NASA'],
    //     upcoming: true,
    //     success: true,
    // }));
    const planet = await planetsCollection.findOne({
        keplerName: launch.target,
    });
    if (!planet) {
        throw new Error('No matching planet was found!');
    }

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
    loadLaunchesData,
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
};