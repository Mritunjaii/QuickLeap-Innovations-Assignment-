require('dotenv').config(); 

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/QL-Assgnment',
};