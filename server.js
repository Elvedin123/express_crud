import express from "express";
import products from "./products/products.js";
import logger from "morgan";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(logger("dev "))
app.get("/products", (req, res) => {
  res.json(products)
})

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find(product => product._id === id);
  res.json(product)
})

app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json(products)
})

app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const productIndex = products.findIndex(product => product._id === id);

  const updatedProduct = {
    ...products[productIndex],
    _id: req.body._id,
    name: req.body.name,
    imgUrl: req.body.imgUrl,
    price: req.body.price,
  };

  products.splice(productIndex, 1, updatedProduct);
  res.json(updatedProduct);
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const productIndex = products.findIndex(product => product._id === id);

  products.splice(productIndex, 1);
  res.json(products)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

