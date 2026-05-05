import dotenv from 'dotenv';
dotenv.config();

import { Given, When, Then } from '@cucumber/cucumber';
import LoginPage from '../../pages/LoginPage';
import { decrypt } from '../../utils/crypto';

let login: LoginPage;

Given('user launches application', { timeout: 60000 }, async function () {
  login = new LoginPage(this.page);

  await this.page.goto(process.env.URL as string, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await this.page.waitForSelector('input[name="username"]', {
    state: 'visible',
    timeout: 30000
  });
});

When('user logs in with valid credentials', { timeout: 30000 }, async function () {

  const username = decrypt(process.env.USER!);
  const password = decrypt(process.env.PASS!);
  const env = process.env.ENV || 'qa';
  console.log("Running in ENV:", env);

  await login.login(username, password, this);
});

Then('user should see dashboard', { timeout: 30000 }, async function () {

  await this.page.waitForSelector("h6:has-text('Dashboard')", {
    state: 'visible',
    timeout: 20000
  });

});