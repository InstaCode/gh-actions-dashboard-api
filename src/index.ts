import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { applicationsRouter } from './applications/applications.router';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';
import { connect } from './server/database';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT:number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/applications', applicationsRouter);
app.use(errorHandler);
app.use(notFoundHandler);
app.use(compression);
app.use;

if (process.env.NODE_ENV !== 'test') {
  connect();
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
