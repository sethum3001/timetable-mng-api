const mongoose = require('mongoose');
const request = require('supertest');
const {server} = require('../../server'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const URL = process.env.MONGODB_URL;

beforeAll(() => {
    return mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(() => {
    return mongoose.connection.close().then(() => server.close());
});

describe('Security tests', () => {
    test('NoSQL Injection - Find User', async () => {
        const response = await request(server)
            .get('/user')
            .query({ username: { $gt: '' } }); // This is a NoSQL Injection attack

        expect(response.status).not.toBe(200); // The request should not be successful
    });

    test('XSS Attack - Create User', async () => {
        const response = await request(server)
            .post('/user')
            .send({ username: '<script>alert("XSS")</script>', password: 'password' }); // This is an XSS attack

        expect(response.status).not.toBe(200); // The request should not be successful
    });

    test('SQL Injection - Find User', async () => {
        const response = await request(server)
            .get('/user')
            .query({ username: "' OR '1'='1" }); // This is an SQL Injection attack

        expect(response.status).not.toBe(200); // The request should not be successful
    });

    // test('Brute Force Attack - Login', async () => {
    //     for (let i = 0; i < 10; i++) {
    //         const response = await request(server)
    //             .post('/user/login')
    //             .send({ username: 'user', password: `password${i}` });

    //         expect(response.status).toBe(400); // The request should not be successful
            
    //     }
    // });

    // test('IDOR - Get User', async () => {
    //     const jwt = require('jsonwebtoken');
    //     const token = jwt.sign({ id: 'user_id' }, process.env.TOKEN_SECRET);

    //     const response = await request(server)
    //         .get('/user/123') // This is an IDOR attack
    //         .set('Authorization', `Bearer ${token}`); // The token of a user that should not have access to user 123

    //     expect(response.status).not.toBe(200); // The request should not be successful
    // });

});