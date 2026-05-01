import BasePage from './BasePage';
import selectors from '../test-data/selectors.json';

export default class LoginPage extends BasePage {


  async login(username: string, password: string, world: any) {
    await this.fill(selectors.username, username);
    await this.fill(selectors.password, password);

    // 📸 Attach screenshot BEFORE clicking login
    const screenshot = await this.page.screenshot({ fullPage: true });
    await world.attach(screenshot, 'image/png');

    await this.click(selectors.loginBtn);
  }

  async isDashboardVisible() {
    await this.page.waitForSelector(selectors.dashboard, { timeout: 25000 });
    await this.highlight(selectors.dashboard);
  }
}