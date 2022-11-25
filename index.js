const { query } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.hjhvnge.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const AllCollection = client.db("Shop").collection("AllCategorised");
  const items = client.db("Shop").collection("Items");
  const MyProducts = client.db("Shop").collection("MyProducts");
  try {
    app.get("/", async (req, res) => {
      const query = {};
      const result = await AllCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/items", async (req, res) => {
      const query = {};
      const result = await items.find(query).toArray();
      res.send(result);
    });

    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { category_id: id };
      const result = await AllCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/MyProducts", async (req, res) => {
      const query = req.body;
      query.date = new Date();
      query.status = false;
      const result = await MyProducts.insertOne(query);
      res.send(result);
    });

    app.get("/MyProducts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await MyProducts.find(query).toArray();
      res.send(result);
    });

    app.delete("/MyProducts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await MyProducts.deleteOne(query);
      res.send(result);
    });
  } catch {
    (error) => console.log(error);
  }
}

run();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
