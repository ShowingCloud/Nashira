const Provider = require('oidc-provider');
const Express = require('express');
const Session = require('express-session');
const RedisStore = require('connect-redis')(Session);
const Helmet = require('helmet');

const oidcRoutes = require('./routes/oidc');
const {
  config,
  oidcConfig,
  clients,
  keystore,
} = require('./config/index');

const RedisAdapter = require('./models/redisAdapter');
require('./models/mongodb');
const Account = require('./models/account');


const app = Express();
app.use(Helmet());
app.use(require('morgan')('combined'));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(require('cookie-parser')(config.sessionSecret));
app.use(require('body-parser').urlencoded({ extended: true }));

app.enable('trust proxy');
app.use(Session({
  cookie: {
    secure: true,
  },
  resave: false,
  saveUninitialized: false,
  secret: [config.sessionSecret, ...config.otherSessionSecrets],
  store: new RedisStore({
    url: config.sessionStorageURL,
    logErrors: true,
    prefix: 'Nashira-Session:',
  }),
}));


const provider = new Provider(config.issuer, {
  ...oidcConfig,

  async findById(ctx, id, token) {
    const account = await Account.findById(id);
    if (account) {
      return {
        accountId: id,
        claims(use, scope, claims, rejected) {
          return Object.assign({}, account, {
            sub: id,
          });
        },
      };
    }

    return null;
  },
});

let server;
(async () => {
  await provider.initialize({
    adapter: RedisAdapter,
    clients,
    keystore: keystore,
  });

  provider.defaultHttpOptions = { timeout: 15000 };
  provider.proxy = true;

  oidcRoutes(app, provider);
  app.use('/oidc', provider.callback);
  server = app.listen(config.port, () => {
    console.log(`application is listening on port ${config.port}, check its /.well-known/openid-configuration`);
  });
})().catch((err) => {
  if (server && server.listening) server.close();
  console.error(err);
  process.exitCode = 1;
});
