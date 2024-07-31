const client = require("./config/redis");

// Function to set multiple users
const setUsers = async () => {
  try {
    await client.set("user:1", "Praveen");
    await client.set("user:2", "Prabhas");
    await client.set("user:3", "Mahesh");
  } catch (error) {
    console.error("Error setting users:", error);
  }
};

// Function to get multiple users
const getUsers = async () => {
  try {
    const users = await client.mget("user:1", "user:2", "user:3");
    console.log("Users:", users);
  } catch (error) {
    console.error("Error getting users:", error);
  }
};

// Function to set and get values
const init = async () => {
  await setUsers();
  await getUsers();
};

// Main execution
const main = async () => {
  await init();
};

main();
