import express from 'express';
import UserRoute from './routes/UserRoute.js';
import KelasRoute from './routes/KelasRoute.js';
import UserKelasRoute from './routes/User_kelasRoute.js';
import MateriRoute from './routes/MateriRoute.js';
import TugasRoute from './routes/TugasRoute.js';
import SubmissionRoute from './routes/SubmissionRoute.js';
import './models/index.js';
import dbContext from './config/Database.js';

const app = express();

app.use(express.json());
app.use(UserRoute);
app.use(KelasRoute);
app.use(UserKelasRoute);
app.use(MateriRoute);
app.use(TugasRoute);
app.use(SubmissionRoute);

app.get("/", (req, res) => {
  res.send("Hello, this is the backend!");
});

dbContext.sync().then(() => {
  console.log('All tables created');
});

app.listen(3002, () => console.log("Server is running on port 3002"));
