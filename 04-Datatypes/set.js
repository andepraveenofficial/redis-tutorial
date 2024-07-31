const client = require("../client");

const add = async () => {
  await client.sadd("ip", "100");
};

const remove = async () => {
  await client.srem("ip");
};

const main = async () => {
  await add();
};

main();
