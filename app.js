const express = require('express');
const app = express();
const PORT = 80;
const path = require("path");
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const products = [
  { id: 1, name: "Phone", price: 299, description: "Smartphone with 64GB storage" },
  { id: 2, name: "Laptop", price: 899, description: "Powerful laptop for work & play" },
  { id: 3, name: "Headphones", price: 99, description: "Noise-cancelling over-ear headphones" }
];

let cart = [];

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Home Route (index.ejs)
app.get('/', (req, res) => {
  res.render('index', { products, title: "Gadgets Sale" });  // Pass title here
});

// Product details
app.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  res.render('product', { product, title: "Gadgets Sale" });  // Pass title here as well
});

// Add to cart
app.post('/add-to-cart', (req, res) => {
  const id = parseInt(req.body.productId);
  const product = products.find(p => p.id === id);
  cart.push(product);
  res.redirect('/cart');
});

// View cart
app.get('/cart', (req, res) => {
  res.render('cart', { cart, title: "Gadgets Sale" });  // Pass title here
});

