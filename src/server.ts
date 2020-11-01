import cors from 'cors';
import express from 'express';
import {sequelize} from './sequelize';

import {IndexRouterV1} from './controllers/v1/index.router';

import bodyParser from 'body-parser';
import {config} from './config/config';
import {V1_FEED_MODELS} from './controllers/v1/model.index';


(async () => {
  await sequelize.addModels(V1_FEED_MODELS);
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());

  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: config.origin_url,
  }));

  app.use('/api/v1/', IndexRouterV1);

  // Root URI call
  app.get( '/', async ( req, res ) => {
    res.send( '/api/v1/' );
  } );


  // Start the Server
  app.listen( port, () => {
    console.log( `server running ${config.url}:${port}` );
    console.log( `press CTRL+C to stop server` );
  } );
})();
