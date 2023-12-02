import mongoose from 'mongoose';

export const mongoInitialize = async () => {
  const DB = process.env.MONGO_DATABASE_URL;

  mongoose.set('strictQuery', true);
  console.log({DB});

  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Database connected');
  } catch (error) {
    console.log(error);
  };
};
