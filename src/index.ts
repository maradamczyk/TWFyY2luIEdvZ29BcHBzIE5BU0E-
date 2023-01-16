import 'reflect-metadata';
import app from './api/server.js';
import config from './config.js';

app.listen(config.port, () => {
    console.log(`Url-colletor is listening on port: ${config.port}`);
});
