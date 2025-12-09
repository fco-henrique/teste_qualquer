const express = require("express");
const productsRoutes = require("./routes/products");
const cors = require('cors'); 
const path = require('path');


const app = express();
app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use("/products", productsRoutes);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
