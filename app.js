const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Contact = require("./models/contact"); // Contact model
const Product = require("./models/products"); // Product model
const axios = require('axios'); // Axios for external API requests

const app = express();

// Connect to MongoDB
const MONGO_URL = "mongodb://127.0.0.1:27017/womenSafetyApp";
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.error("DB Connection Error: ", err);
});

// Setup EJS and Static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(methodOverride("_method")); // To override methods for PUT/DELETE
app.use(express.static(path.join(__dirname, "public"))); // Static files

// Home Page
app.get("/", async (req, res) => {
    const products = await Product.find({}); // Correctly referencing products model
    res.render("index", { products }); // Pass products to the index view
});

// Google Maps Page
app.get("/map", (req, res) => {
    res.render("map", { googleMapsAPIKey: 'YOUR_GOOGLE_MAPS_API_KEY_HERE' }); // Pass Google Maps API key to the map view
});

// ** Contact Routes **

// Add New Contact Page
app.get("/contacts/new", (req, res) => {
    res.render("contacts/new"); // Render form to add a new contact
});

// Create Contact Route
app.post("/contacts", async (req, res) => {
    const { name, phone, email } = req.body;
    const newContact = new Contact({ name, phone, email });
    await newContact.save();
    res.redirect("/contacts");
});

// Display All Contacts
app.get("/contacts", async (req, res) => {
    const contacts = await Contact.find({});
    res.render("contacts/index", { contacts });
});

// Show Single Contact
app.get("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    res.render("contacts/show", { contact });
});

// Edit Contact Page
app.get("/contacts/:id/edit", async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    res.render("contacts/edit", { contact });
});

// Update Contact Route
app.put("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    await Contact.findByIdAndUpdate(id, { name, phone, email });
    res.redirect(`/contacts/${id}`);
});

// Delete Contact Route
app.delete("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.redirect("/contacts");
});

// ** Product Routes **

// Add New Product Page
app.get("/products/new", (req, res) => {
    res.render("products/new"); // Render form to add a new product
});

// Create Product Route
app.post("/products", async (req, res) => {
    const { name, price, description, image } = req.body;
    const newProduct = new Product({ name, price, description, image });
    await newProduct.save();
    res.redirect("/products");
});

// // Display All Products
// app.get("/products", async (req, res) => {
//     const products = await Product.find({});
//     res.render("products/index", { products }); // Ensure this matches your EJS filename
// });

// Display All Products
app.get("/products", async (req, res) => {
    const products = await Product.find({});
    res.render("products/index", { products }); // Ensure this matches your EJS filename
});

// Show Single Product
app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/show", { product }); // Render the product detail page
});

// ** Cart Functionality **

let cart = [];

// Add Product to Cart
app.post("/cart", (req, res) => {
    const { productId } = req.body;
    cart.push(productId);
    res.redirect("/cart");
});

// View Cart
app.get("/cart", async (req, res) => {
    const productsInCart = await Product.find({ _id: { $in: cart } });
    res.render("cart", { products: productsInCart });
});

// Checkout Route
app.post("/checkout", (req, res) => {
    // Here you can handle the checkout process (e.g., payment integration)
    cart = []; // Clear the cart after checkout
    res.redirect("/products"); // Redirect to products after checkout
});

// Start the server
app.listen(8080, () => {
    console.log("Server running on port 8080");
});
