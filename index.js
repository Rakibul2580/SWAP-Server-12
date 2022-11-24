const { query } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.hjhvnge.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const AllCollection = client.db("Shop").collection("AllCategorised");
const items = client.db("Shop").collection("Items");

async function run() {
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
  } catch {
    (error) => console.log(error);
  }
}

run();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
