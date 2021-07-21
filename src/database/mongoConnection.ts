import mongoose from 'mongoose';
import { resolve } from 'path';
import { config } from 'dotenv';

const path = resolve(__dirname, "..", "enviroments", ".env");
config({ path });

const URL = process.env.MONGODB_HOST as string;

export default async () => {
  // mongoose.set('useFindAndModify', false);

  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("💾 Mongo Database connected");
  });

  return mongoose;
};
