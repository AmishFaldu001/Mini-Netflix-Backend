import * as express from 'express';

export const app = express();

// Consume body in JSON format
app.use(express.json());
