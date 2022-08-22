import * as swaggerjsdoc from 'swagger-jsdoc';
import * as swaggerui from 'swagger-ui-express';
import { app } from './app';
import { appConfig } from './config/application.config';

const swaggerDocument = swaggerjsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Mini Netflix Backend',
      description: 'Apis to browse movies',
    },
  },
  apis: ['./src/*.routes.js'],
});
app.use('/api-explorer', swaggerui.serve, swaggerui.setup(swaggerDocument));

app.listen(appConfig.port, () => {
  console.log(
    `Application started on port: ${appConfig.port}. Visit http://localhost:${appConfig.port}/api-explorer for swagger api docs`,
  );
});
