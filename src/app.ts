'use strict';
import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8999;

// CORS
app.use(cors());
app.options('*', cors());

app.use('/api/mail', require('./mail'));

app.listen(port, () => {
  return console.log(`Server started on port ${port}`);
});
