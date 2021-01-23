import Knex from 'knex';
import { Model } from 'objection';

import knexConfig from '../knexfile';
import app from './app';

const port = process.env.PORT || 3000;
const knex = Knex(knexConfig.development);

Model.knex(knex);

app.listen(port, () => console.info(`Listing on ${port}`));
