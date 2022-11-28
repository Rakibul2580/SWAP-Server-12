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
// .skip(35)
async function run() {
  const AllCollection = client.db("Shop").collection("AllCategorised");
  const items = client.db("Shop").collection("Items");
  const MyProducts = client.db("Shop").collection("MyProducts");
  const users = client.db("Shop").collection("users");
  try {
    app.get("/", async (req, res) => {
      const query = {};
      const result = await items.find(query).toArray();
      res.send(result);
    });

    app.get("/Advertisement", async (req, res) => {
      const query = {};
      const result = await AllCollection.find(query).skip(33).toArray();
      res.send(result);
    });

    app.post("/AllCollection", async (req, res) => {
      const query = req.body;
      query.date = new Date();
      const result = await AllCollection.insertOne(query);
      res.send(result);
    });
    app.put("/AllCollection/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const update = req.body.add;
      const updatedDoc = {
        $set: {
          add: update,
        },
      };
      const result = await AllCollection.updateOne(query, updatedDoc);
      res.send(result);
    });

    app.get("/addProducts/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await AllCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { category_id: id };
      const result = await AllCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/payment/id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await AllCollection.findOne(query);
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

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await MyProducts.findOne(query);
      res.send(result);
    });
    app.delete("/MyProducts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await MyProducts.deleteOne(query);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await users.insertOne(user);
      res.send(result);
    });
    app.get("/users", async (req, res) => {
      const query = {};
      const result = await users.find(query).toArray();
      res.send(result);
    });
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await users.deleteOne(query);
      res.send(result);
    });
    app.put("/seller/:id", async (req, res) => {
      const id = req.params.id;
      const query = { seller_name: id };
      const update = req.body.seller_verified;
      const updatedDoc = {
        $set: {
          seller_verified: update,
        },
      };
      const result = await AllCollection.updateMany(query, updatedDoc);
      res.send(result);
    });
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await users.findOne(query);
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
