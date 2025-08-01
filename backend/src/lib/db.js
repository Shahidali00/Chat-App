import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to MongoDB ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB ${error.message}`);
  }
};

export default connectDB;