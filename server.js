const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connect = require('./config/db')
const authRoute = require('./routes/auth/router')
const adminProductRoute = require('./routes/admin/productRoute')
const shopProductRoute = require('./routes/shop/productRoutes')
const shopCartRoute = require('./routes/shop/cartRoutes')
const shopAddressRoute = require('./routes/shop/addressRoute')
const shopSearchRoute = require('./routes/shop/searchRoute')
const shopReviewRoute = require('./routes/shop/reviewRoute')
require("dotenv").config();

connect();

const app = express();
const APP_PORT = process.env.PORT || 5515;


app.use(
  cors({
    origin: "http://localhost:5173" || "https://ecommerce-frontend-ebon-one.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());



app.use('/api/auth/', authRoute)
app.use('/api/admin/products', adminProductRoute)
app.use('/api/shop/products', shopProductRoute)
app.use('/api/shop/cart', shopCartRoute);
app.use('/api/shop/address', shopAddressRoute);
app.use('/api/shop/search', shopSearchRoute);
app.use('/api/shop/review', shopReviewRoute);


app.listen(APP_PORT, () => {
  console.log(`Server is listening on ${APP_PORT}`)
})

