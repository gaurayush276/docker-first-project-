import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv" ; 


const app = express();

dotenv.config() ;

app.use(cors());
app.use(express.json());

// DB CONNECTION

async function database() {

   await mongoose
      .connect(process.env.MONGO_CONNECTION)   // 'mongo' = container name
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));
}

// Schema
const Note = mongoose.model("Note", { text: String });

// Routes
app.get("/", (req, res) => res.send("Backend Running"));

app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const note = new Note({ text: req.body.text });
  await note.save();
  res.json(note);
});

database() ; 
app.listen(5000, () => console.log("Backend running on port 5000"));
