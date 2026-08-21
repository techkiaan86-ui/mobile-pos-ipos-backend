const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectdb = require('./Config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./app'); 

dotenv.config();
connectdb();


app.use(bodyParser.json()); 
app.use(express.json({ limit: "500mb" })); 
app.use(express.urlencoded({ limit: "500mb", extended: true }));

app.use(cookieParser());
app.use(morgan('dev'));
//app.use(cors({ origin: "*", credentials: true }));
// Proper CORS Setup



const allowedOrigins = [
  "https://posmobile.kiaantechnology.com",
  "http://localhost:3000",
  "http://localhost:5174",
  "http://localhost:5173",
  "https://iexpertpos.com.au",
  "https://iexpertpos.store"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



app.get("/", (req, res) => {
    res.send("Welcome to the Pos Backend API! Everything is working properly.");
  
});


app.use(router);

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..🖐🖐`);
});
