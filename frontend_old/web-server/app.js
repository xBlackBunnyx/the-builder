/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
import EXPRESS from 'express';
import PATH from 'path';
import {fileURLToPath} from 'url';
const APP = EXPRESS();

// Modification required to work with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = PATH.dirname(__filename);

// set the port
APP.set('port', 8080);

// tell express that we want to use the www folder
// for our static assets
APP.use(EXPRESS.static(PATH.join(__dirname, '../The Builder/')));

// Listen for requests
const SERVER = APP.listen(APP.get('port'), '0.0.0.0', () => {
  console.log('The server is running on http://127.0.0.1:' + APP.get('port'));
});
