import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors())

app.listen(process.env.PORT || 3333, () => {
  console.log("🚀 Backend started!");
});;
