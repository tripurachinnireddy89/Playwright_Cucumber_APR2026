import dotenv from 'dotenv';
dotenv.config();
import { Given, When, Then } from '@cucumber/cucumber';
import LoginPage from '../../pages/LoginPage';
import data from '../../test-data/testdata.json';
import { decrypt } from '../../utils/crypto';

let login: LoginPage;


Given('user launches application', { timeout: 30000 }, async function () {
  login = new LoginPage(this.page);

  await this.page.goto(process.env.URL as string, {
    waitUntil: 'load',
    timeout: 30000
  });

  // ✅ wait for login page element instead
  await this.page.waitForSelector('input[name="username"]', {
    timeout: 15000
  });
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

// Then('user should see dashboard', async function () {
//   await login.isDashboardVisible();
// });


Then('user should see dashboard', { timeout: 30000 }, async function () {

  // wait for either success or failure
  await this.page.waitForLoadState('domcontentloaded');

  const dashboard = this.page.locator("h6:has-text('Dashboard')");
  const loginError = this.page.locator('.oxd-alert-content-text');

  if (await dashboard.isVisible().catch(() => false)) {
    // success ✔
    await dashboard.evaluate((el: any) => {
      el.style.border = '3px solid red';
    });
  } else if (await loginError.isVisible().catch(() => false)) {
    throw new Error("Login failed in CI - credentials not accepted");
  } else {
    throw new Error("Dashboard not found and no error message visible");
  }

});



