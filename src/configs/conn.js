import mongoose from "mongoose";

const DB = mongodb+srv://admin:9sYtYunkFxBvt7W8rCvG@cluster0.maytdec.mongodb.net/?retryWrites=true&w=majority

export const mongoInitialize = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Database Connected");
  }).catch((err) => console.log(err));
}
