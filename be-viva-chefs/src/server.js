import dotenv from 'dotenv';
dotenv.config();

import { PORT } from './configs/index.js';
import app from './app.js';

const port = PORT || 3001;

app.listen(port, ()=>{
  console.log(`Server has been started on http:://localhost:${port}`);
});

