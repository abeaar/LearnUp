import cors from 'cors';
import express from 'express';
import UserRoute from './routes/UserRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.get("/", (req, res) => {
  res.send("Hello, this is the backend!");
});


app.listen(3002, () => console.log("Server is running on port 3002"));
