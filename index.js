const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

dotenv.config();

const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');
const transactionRoute = require('./routes/transaction');

// const connect = async () => {
//   try {
//     // await mongoose.connect(process.env.URL);
//     await mongoose.connect(
//       'mongodb+srv://tenni:tenni2307@cluster0.tubdkb5.mongodb.net/booking?retryWrites=true&w=majority'
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// };
// const store = new MongoDBStore({
//   uri: process.env.URL,
//   collection: 'sessions',
// });
mongoose.connect(
  'mongodb+srv://tenni:tenni2307@cluster0.tubdkb5.mongodb.net/booking?retryWrites=true&w=majority'
);

app.use(cors());

//middlewares
app.use(express.json());
app.use(cookieParser());

// app.use(
//   session({
//     secret: process.env.SESSION,
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );
app.get('/', (req, res, next) => {
  res.json('Hello');
});
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/transactions', transactionRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  // connect();
  console.log('Connect port:', 5000);
});
