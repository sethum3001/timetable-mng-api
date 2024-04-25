const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

require('dotenv').config();

jest.setTimeout(60000);

const mongod = new MongoMemoryServer();

async function connect() {
    await mongod.start();
    const uri = mongod.getUri();

    await mongoose.connect(uri);
}

async function closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

async function clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

module.exports = { connect, closeDatabase, clearDatabase };