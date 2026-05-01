import { Page } from 'playwright';

export default class BasePage {
  constructor(public page: Page) {}

  async launch(url: string) {
    await this.page.goto(url);
  }

 async click(locator: string) {
  await this.highlight(locator);   // highlight first
  await this.page.locator(locator).click();
}

async fill(locator: string, value: string) {
  await this.highlight(locator);   // highlight first
  await this.page.locator(locator).fill(value);
}

  async getText(locator: string) {
    return await this.page.locator(locator).textContent();
  }

async takeStepScreenshot(name: string) {
  await this.page.screenshot({ path: `reports/${name}.png` });
}


async highlight(locator: string) {
  const element = this.page.locator(locator).first();

  await element.waitFor(); // ensures visibility

  await element.evaluate((el) => {
    el.style.border = '3px solid red';
    el.style.backgroundColor = 'yellow';
  });
}
}