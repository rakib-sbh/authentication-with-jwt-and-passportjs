require("dotenv").config();

const app = require("./app/app");

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
