const prisma = require("./config/db");

async function test() {
  const questions = await prisma.question.findMany();
  console.log("Questions from DB:", questions);
}

test();
