const express = require("express");
const axios = require("axios");
const client = require("./config/redis");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/data", async (req, res) => {
  const url = "https://jsonplaceholder.typicode.com/todos";
  const data = await axios.get(url);
  console.log(data.data);
  res.json(data.data);
});

app.get("/fast-data", async (req, res) => {
  const cacheExist = await client.exists("todos");

  if (cacheExist) {
    const cacheValue = await client.get("todos");
    const data = JSON.parse(cacheValue);
    res.json(data);
  } else {
    const url = "https://jsonplaceholder.typicode.com/todos";
    const data = await axios.get(url);
    console.log(data.data);
    await client.set("todos", JSON.stringify(data.data));
    await client.expire("todos", 30); // 30 sec
    res.json(data.data);
  }
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const key = `todo:${id}`;

  const cacheExist = await client.exists(key);

  if (cacheExist) {
    const cacheValue = await client.get(key);
    const data = JSON.parse(cacheValue);
    res.json(data);
  } else {
    const url = "https://jsonplaceholder.typicode.com/todos";
    const data = await axios.get(`${url}/${id}`);
    console.log(data.data);
    await client.set(key, JSON.stringify(data.data));
    await client.expire(key, 30); // 30 sec
    res.json(data.data);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
