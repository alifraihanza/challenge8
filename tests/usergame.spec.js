const { user_game, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
require('../controllers/user_gameController');
const request = require('supertest');
const app = require('../app');

describe('User Games API Controller Testing', () => {
  beforeAll(async () => {
    await request(app).post('/api/register').send({ nama_pengguna: 'boy', email: 'boy', kata_sandi: 'boy', role_id: 1 });
    const login = await request(app).post('/api/loginAPI').send({ nama_pengguna: 'boy', kata_sandi: 'boy' });
    token = login.body.token;
  });
  afterAll(async () => {
    try {
      await sequelize.query('TRUNCATE user_game, user_game_biodata, user_game_history RESTART IDENTITY;', { type: QueryTypes.RAW });
    } catch (error) {
      console.log(error);
    }
  });


  test('Get User Game', async () => {
    const { body, statusCode } = await request(app).get('/usergameapi').set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual('Success');
  });
  test('Gagal Belum Login Auth', async () => {
    const { statusCode, error } = await request(app).get('/usergameapi');
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual('A token is required for authentication');
  });
  test('Get User Game Id with Auth', async () => {
    const { body, statusCode } = await request(app).get('/usergame/1').set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual('Success');
  });
  test('Id User Game Tidak Sesuai', async () => {
    const { body, statusCode } = await request(app).get('/usergame/1100').set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('User Game Tidak di temukan');
  });
  test('Gagal Get Id Belum Login', async () => {
    const { statusCode, error } = await request(app).get('/usergame/1');
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual('A token is required for authentication');
  });
});
