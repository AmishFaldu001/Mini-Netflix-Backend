import { app } from './app';
import { appConfig } from './config/application.config';
import { setupSwagger } from './swagger';

/**
 * Start express server with pre-setup stuff and listening to a port
 */
const setupServer = () => {
  setupSwagger(app);

  app.listen(appConfig.port, () => {
    console.log(
      `Application started on port: ${appConfig.port}. Visit http://localhost:${appConfig.port}/api-explorer for swagger api docs`,
    );
  });
};

setupServer();
