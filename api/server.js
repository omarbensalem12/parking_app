const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const dbConfig = require("./app/config/db.config");
const morgan = require('morgan')
const ObjectId = require('mongodb').ObjectId;
const cron1 = require('node-cron');
const db = require("./app/models");

const Parking = db.parking
const Reservation = db.reservation
const ParkingSpot = db.parkingSpot
const app = express();
app.use(cors({ origin: '*' }));

app.use(morgan('combined'))


const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"]
  }
});



const imageDirectory = path.join(__dirname, 'app/uploads');

/* for Angular Client (withCredentials) */
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:8081"],
//   })
// );

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);


require("./app/routes/country.routes")(app);
const { error } = require("console");
const Role = db.role;

db.mongoose
  .connect(
    `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
    ,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
app.get('/api/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(imageDirectory, filename);

  res.sendFile(imagePath);
});
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/parking.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {  // Change this line
  console.log(`Server is running on port ${PORT}.`);
});



function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "driver"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'driver' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "superAdmin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'superAdmin' to roles collection");
      });
    }
  });
}
io.on('connection', (socket) => {
  console.log('Nouvelle connexion WebSocket');


  notification();

  const cronJob = cron1.schedule('* * * * *', () => {
    notification(); 
  });

  socket.on('disconnect', () => {
    cronJob.stop();
  });
});

async function notification() {
  try {
    const soonReservations = await Reservation.find({
    });

    const currentTime = new Date();

    for (const reservation of soonReservations) {
      const timeDifference = reservation.startDate - currentTime;
      const notificationThreshold = 30 * 60000;
      const notificationWindow = 60000; 

      if (timeDifference > notificationThreshold - notificationWindow && 
          timeDifference < notificationThreshold + notificationWindow) {
        io.emit('toastActivated');
        console.log('Notification envoyée pour la réservation :', reservation._id);
      }
    }

    console.log('Notifications mises à jour avec succès.');
  } catch (error) {
    console.error('Erreur lors de la mise à jour des notifications :', error);
  }
}
