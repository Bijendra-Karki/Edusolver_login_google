import express from "express";
import dotenv from "dotenv";
import router from "./router/testroute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    res.send('we are on main page')
})


app.use("/api",router)



app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
