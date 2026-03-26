// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/calmhaven';
//         console.log('Attempting to connect to MongoDB at:', mongoURI);
        
//         const conn = await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
        
//         // Log database collections
//         const collections = await conn.connection.db.listCollections().toArray();
//         console.log('Available collections:', collections.map(c => c.name));
        
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
        
//         // Create indexes for User model
//         const User = require('../Models/User');
//         await User.collection.createIndex({ username: 1 }, { unique: true });
//         await User.collection.createIndex({ email: 1 }, { unique: true });
//         console.log('Database indexes created successfully');
        
//     } catch (error) {
//         console.error(`MongoDB Connection Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;


const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // ✅ FIX: use correct env variable name
        const mongoURI = process.env.MONGODB_URL;

        if (!mongoURI) {
            throw new Error("MONGODB_URL is not defined in environment variables");
        }

        console.log('Attempting to connect to MongoDB at:', mongoURI);

        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        // ✅ Safe: check collections (optional)
        try {
            const collections = await conn.connection.db.listCollections().toArray();
            console.log('Available collections:', collections.map(c => c.name));
        } catch (err) {
            console.log('Skipping collections listing');
        }

        // ✅ Create indexes safely
        try {
            const User = require('../Models/User');

            await User.collection.createIndex({ username: 1 }, { unique: true });
            await User.collection.createIndex({ email: 1 }, { unique: true });

            console.log('✅ Database indexes created successfully');
        } catch (err) {
            console.log('Index creation skipped or already exists');
        }

    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;