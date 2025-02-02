const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);


async function newUser(userInfo) {
    // Connect to the Atlas cluster
    await client.connect();

    // Get the database and collection on which to run the operation
    const db = client.db("teacherAid");
    const users = db.collection("users");

    // Insert the documents into the specified collection        
    const p = await users.insertMany([userInfo]);
    await client.close();
}

async function getUser(userEmail) {
    try{
        await client.connect();

        const db = client.db("teacherAid");
        const users = db.collection("users");
    
        const filter = {"email": userEmail};
        console.log("Filter Created");
        const document = await users.findOne(filter);
        console.log("Document found:\n" + JSON.stringify(document));

        return document;
    } catch (error) {
        throw error;
    } finally {
        await client.close();
    }

}

async function getClassroom(roomName) {

    // Connect to the Atlas cluster
    await client.connect();

    // Get the database and collection on which to run the operation
    const db = client.db("teacherAid");
    const classrooms = db.collection("classrooms");

    const document = await classrooms.find(className(roomName));
    console.log("Document found:\n" + JSON.stringify(document));

    await client.close();

    return document;
}

async function newClassroom(newClassroom) {
await client.connect();

const db = client.db("teacherAid");
const classrooms = db.collection("classrooms");

const p = await classrooms.insertMany([newClassroom]);
console.log(p);
await client.close();
}

module.exports = {
    newUser,
    getUser,
    newClassroom,
    getClassroom
};

// const instructorData = newSchema({
//     _id: {
//         type: Number,
//         required: true,
//     },

//     name: {
//         type: String,
//         required: true,
//     },

//     email: {
//         type: String,
//         required: true,
//     },

//     password: {
//         type: String,
//         required: true,
//     },

//     createdClasses: {
//         type: Array,
//         required: false,
//     }
// });

// const classroomData = newSchema({
//     _id: {
//         type: Number,
//         required: true,
//     },

//     className: {
//         type: String,
//         required: true,
//     },

//     rows: {
//         type: Number,
//         required: true,
//     },

//     columns: {
//         type: Number,
//         required: true,
//     },

//     eliminatedRows: {
//         type: Array,
//         required: false,
//     },

//     eliminatedColumns: {
//         type: Array,
//         required: false,
//     },

//     eliminatedSeats: {
//         type: Array,
//         required: false,
//     },
// });