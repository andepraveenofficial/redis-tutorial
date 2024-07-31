const { Redis } = require("ioredis");

const config = {
  password: "AqiEYBXMt4XHyGhSM92uEgOULm6PdHeD",
  host: "redis-11185.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 11185,
};

const client = new Redis(config);

module.exports = client;
