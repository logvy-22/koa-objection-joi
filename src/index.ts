import Knex from 'knex';
import { Model } from 'objection';

import knexConfig from '../knexfile';
import app from './app';

const knex = Knex(knexConfig.development);
Model.knex(knex);

app.listen(process.env.PORT_NUMBER, () => console.info(`Listing on ${process.env.PORT_NUMBER} port`));
