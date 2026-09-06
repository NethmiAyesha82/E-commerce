const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "10mb" }));

const allowedOrigins = [
  "https://e-commerce-5qys.vercel.app",
  "https://e-commerce-dozh.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

app.options("*", cors());

const mongoURI = "mongodb+srv://root:1234@cluster0.gztopa6.mongodb.net/ecommerce";

let isConnected = false;
const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) return;
  try {
    const db = await mongoose.connect(mongoURI);
    isConnected = db.connections[0].readyState === 1;
  } catch (err) {
    console.error("DB Error:", err);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

const Product =
  mongoose.models.Product ||
  mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
  });

// HTTP/Localhost image URLs automatically Fix කරන Helper Function එක
const fixImageUrl = (product) => {
  let img = product.image;
  if (img && img.startsWith("http://")) {
    img = img.replace("http://", "https://");
  }
  return { ...product._doc, image: img };
};

app.get("/", (req, res) => {
  res.send("Backend API Running Successfully");
});

app.get(["/allproducts", "/allproduct"], async (req, res) => {
  try {
    let products = await Product.find({});
    let fixedProducts = products.map(fixImageUrl);
    res.send(fixedProducts);
  } catch (error) {
    res.status(500).send({ error: "Error fetching products" });
  }
});

app.get("/newcollections", async (req, res) => {
  try {
    let products = await Product.find({});
    let newcollection = products.slice(-8).reverse().map(fixImageUrl);
    res.send(newcollection);
  } catch (error) {
    res.status(500).send([]);
  }
});

app.get("/popularinwomen", async (req, res) => {
  try {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4).map(fixImageUrl);
    res.send(popular_in_women);
  } catch (error) {
    res.status(500).send([]);
  }
});

module.exports = app;