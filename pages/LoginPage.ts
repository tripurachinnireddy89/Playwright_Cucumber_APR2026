import BasePage from './BasePage';
import selectors from '../test-data/selectors.json';

export default class LoginPage extends BasePage {

  async login(username: string, password: string, world: any) {

    await this.fill(selectors.Login.username, username);
    await this.fill(selectors.Login.password, password);

    const screenshot = await this.page.screenshot({ fullPage: true });
    await world.attach(screenshot, 'image/png');

    // ✅ FIX: Proper navigation handling
    await Promise.all([
      this.page.waitForSelector(selectors.Login.dashboard, { timeout: 20000 }),
      this.click(selectors.Login.loginBtn)
    ]);
  }

  async isDashboardVisible() {
    await this.page.waitForSelector(selectors.Login.dashboard, {
      state: 'visible',
      timeout: 20000
    });
  }
}