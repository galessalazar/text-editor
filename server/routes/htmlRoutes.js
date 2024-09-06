const path = require('path');

module.exports = (app) =>
  app.get('/', (req, res) =>
    // i changed the path and added ../ 
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
  );
