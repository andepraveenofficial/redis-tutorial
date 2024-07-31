const client = require("../client");

const lpush = async (item) => {
  await client.lpush("messages", item);
};

const rpush = async (item) => {
  await client.rpush("messages", item);
};

const getList = async () => {
  const list = await client.lrange("messages", 0, -1);
  console.log(list);
};

const main = async () => {
  await lpush("one");
  await lpush("two");
  await getList();

  await rpush("last");
  await rpush("lastsecond");
  await getList();
  console.log(await client.llen("messages"));

  await client.lpop("messages");
  await client.rpop("messages");
  await getList();
  console.log(await client.llen("messages"));

  await client.rpop("messages");
  await client.rpop("messages");

  await client.blpop("messages", 10); // Block Mode // If list empty upto 10 sec this command will avaiable
};

main();
