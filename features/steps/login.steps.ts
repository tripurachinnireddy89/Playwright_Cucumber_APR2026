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

  // ✅ wait for navigation to complete properly
  await this.page.waitForURL('**/dashboard/index', { timeout: 20000 });

  // ✅ ensure DOM is ready
  await this.page.waitForLoadState('domcontentloaded');

  // ✅ better locator (more reliable)
  const dashboard = this.page.locator("//h6[normalize-space()='Dashboard']").first();

  // ✅ wait for visibility
  await dashboard.waitFor({ state: 'visible', timeout: 15000 });

  // ✅ highlight (safe)
  await dashboard.evaluate((el: any) => {
    el.style.border = '3px solid red';
  });

});


