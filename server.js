import app from "./app.js";
import connectDb from "./config/database.js";


connectDb()

app.listen(process.env.PORT, () => {
  console.log(`Server is Listening on port ${process.env.PORT}`);
});
