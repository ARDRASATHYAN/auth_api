const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require('cors');
const router = require('./backend/src/routers/userRouter');

dotenv.config();

const app = express();
app.use(cors());


const PORT = process.env.PORT || 5000;

app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//routes
app.use('/user',router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
