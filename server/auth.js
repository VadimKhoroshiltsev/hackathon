import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import config from '../config/env';

const AUTH_COOKIE_NAME = 'authorization-token';
const DEFAULT_PATH = '/';
const AUTH_PATH = '/auth';
const AUTH_URL = `${config.AUTH_SERVICE_URL}?redirect=${encodeURIComponent(config.AUTH_REDIRECT_URL + AUTH_PATH)}`;

function respondUnauthorized(res, err) {
  console.error(err); // eslint-disable-line no-console
  res.status(401).send('Unauthorized');
}

function handleAuthentication(req, res) {
  const token = req.query.token;
  if (token) {
    res.cookie(AUTH_COOKIE_NAME, decodeURIComponent(token));
    res.redirect(DEFAULT_PATH);
  } else {
    respondUnauthorized(res, req.originalUrl);
  }
}

export function auth(req, res, next) {
  const token = req.cookies[AUTH_COOKIE_NAME];
  if (!token) {
    res.redirect(AUTH_URL);
    return;
  }
  try {
    req.user = jwt.verify(token, config.AUTH_JWT_SECRET);
    console.log('USER: ', req.user);
    next();
  } catch (e) {
    respondUnauthorized(res, e);
  }
}

export default app => {
  app.use(cookieParser(config.COOKIE_SECRET));
  app.use(bodyParser.json());

  app.get(AUTH_PATH, handleAuthentication);
};
