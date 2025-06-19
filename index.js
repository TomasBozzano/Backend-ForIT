import express from 'express';
import { createServer } from 'http';
import { router } from './src/routers/router.js';

const app = express();
const server = createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

server.listen(port, () => {
    console.log(`Puerto -> ${port}`);}
);