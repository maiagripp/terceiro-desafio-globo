const jwt = require('jsonwebtoken');
const { Router } = require('express');

const NoticesRepository = require('./news/models/new');
const authMiddleware = require('./shared/middlewares/authMiddleware');
const router = Router();

router.get('/att-data', (req, res) => {
  res.send('Hello World!');
});

router.get('/health', (req, res) => {
  res.send('Hello World!');
});

router.get('/notices', async (req, res) => {
  const notices = await NoticesRepository.list(req, res);

  return res.json(notices);
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const { JWT_SECRET, JWT_EXPIRES_IN_MINUTES } = process.env;

  const token = jwt.sign({
    sub: 1,
    nameOfUser: 'Admin',
  }, JWT_SECRET, { expiresIn: `${JWT_EXPIRES_IN_MINUTES}m` });

  res.json({
    token,
  });
});

router.post('/news', async (req, res) => {
  const { body } = req;
  const result = await NoticesRepository.create(body);
  return res.send('OK');
});

router.get('/news', authMiddleware, async (req, res) => {
  const news = await NoticesRepository.findAll();

  return res.json(news);
});

module.exports = router;
