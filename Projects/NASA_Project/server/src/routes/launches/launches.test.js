const request = require('supertest');
const app = require('../../app');
const { 
    mongoConnect, mongoDisconnect,
} = require('../../services/mongo');

// Creating a nested testing Environment to setup our mongo connection
describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    // Creating a test fixture with different test cases
    describe('Test GET /launches', () => {
        test('It should respond with 200 status code', async () => {
            const response = await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
            // expect(response.statusCode).toBe(200); // assertions
        });
    });

    describe('Test POST /launches', () => {
        const launchData = {
            mission: 'USS Enterprise',
            rocket: 'Instersteller Space Explorer',
            target: 'Kepler-62 f',
            launchDate: 'January 4, 2028',
        };

        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'Instersteller Space Explorer',
            target: 'Kepler-62 f',
        };

        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'Instersteller Space Explorer',
            target: 'Kepler-62 f',
            launchDate: 'zoot',
        }

        test('It should respond with 201 status created', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchData)
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate = new Date(launchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);

            expect(response.body).toMatchObject(launchDataWithoutDate);
        });

        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Missing required launch property',
            });
        });

        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            });
        });
    });
});