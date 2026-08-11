require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "Wireless Headphones",
    price: 99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: 4.5,
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Smart Watch",
    price: 149,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    rating: 4.2,
    category: "Electronics",
    stock: 30,
  },
  {
    name: "Bluetooth Speaker",
    price: 59,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    rating: 4.7,
    category: "Electronics",
    stock: 40,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected!");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products added successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error:", err));
