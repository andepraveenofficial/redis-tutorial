const client = require("../client");

/* -----> TTL <----- */
// Set Expiry time -> Time To Limit

const setName = async () => {
  await client.set("name", "Ande Praveen");
};

const getName = async () => {
  const name = await client.get("name");
  return name;
};

const expire = async () => {
  await client.expire("name", 5); // Expire name key after 5 seconds
};
setName();
expire();
const timerId = setInterval(async () => {
  const name = await getName();
  console.log(name);
}, 1000);

setTimeout(() => {
  clearInterval(timerId);
}, 10000);
