const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const passportJwt = require('./passport');
const apiRouter = require('../routes/api');
const errorHandler = require('../middlewares/error-handler');
const config = require('../config');
const useHttps = require('../middlewares/use-https');

const swaggerDocument = YAML.load(path.resolve(__dirname, '../../openapi/api.yaml'));
const socketHandler = require('../realtime/socketHandler');

const app = express();
// var http = require('http').Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

if (config.env !== 'test') app.use(morgan('combined'));

// passport
app.use(passport.initialize());
passport.use('jwt', passportJwt.jwt);

app.use('/api', apiRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(useHttps(), express.static(path.resolve(__dirname, '../../../www')));

app.use(useHttps(), (_req, res, _next) => {
  res.sendFile(path.resolve(__dirname, '../../../www/index.html'));
});

app.use(errorHandler.handleError);

exports.start = () => {
  const httpServer = app.listen(config.port, (err) => {
    if (err) {
      console.log(`Error : ${err}`);
      process.exit(-1);
    }
    socketHandler.register(httpServer);
    // eslint-disable-next-line global-require
    require('../realtime').initialize();
    console.log(`${config.app} is running on ${config.port}`);
  });
};

exports.app = app;
