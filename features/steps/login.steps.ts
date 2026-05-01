import dotenv from 'dotenv';
dotenv.config();
import { Given, When, Then } from '@cucumber/cucumber';
import LoginPage from '../../pages/LoginPage';
import data from '../../test-data/testdata.json';
import { decrypt } from '../../utils/crypto';

let login: LoginPage;

Given('user launches application', async function () {
  login = new LoginPage(this.page);
  await login.launch('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

When('user enters login details', async function () {
console.log("USER:", process.env.USER);
console.log("PASS:", process.env.PASS);

const username = decrypt(process.env.USER as string);
const password = decrypt(process.env.PASS as string);

  await login.login(username, password, this);
await this.page.waitForLoadState('networkidle');
await this.page.waitForTimeout(500);
});

Then('user should see dashboard', async function () {
  await login.isDashboardVisible();
});