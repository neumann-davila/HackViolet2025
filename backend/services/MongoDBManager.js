const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(url, {
           
        });
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = connectDB;

const instructorData = newSchema({
    _id: {
        type: Number,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    createdClasses: {
        type: Array,
        required: false,
    }
});

const classroomData = newSchema({
    _id: {
        type: Number,
        required: true,
    },

    className: {
        type: String,
        required: true,
    },

    rows: {
        type: Number,
        required: true,
    },

    columns: {
        type: Number,
        required: true,
    },

    eliminatedRows: {
        type: Array,
        required: false,
    },

    eliminatedColumns: {
        type: Array,
        required: false,
    },

    eliminatedSeats: {
        type: Array,
        required: false,
    },
});