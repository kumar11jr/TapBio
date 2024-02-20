import express from 'express';
import cors from 'cors';

const app = express();
const mainRouter = require("./routes/index")

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter)

app.get('/', (req: any, res: any) => {
    res.send('Hello World');
});

app.listen(8080, () => console.log("Server running on 8080"));