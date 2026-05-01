import { Before, AfterStep, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

AfterStep(async function ({ pickleStep }) {

  const stepName = pickleStep.text;

  // ❌ Skip screenshot for login step
  if (stepName.includes('login details')) return;

  await this.page.waitForLoadState('networkidle');

  const screenshot = await this.page.screenshot({ fullPage: true });
  await this.attach(screenshot, 'image/png');
});

After(async function () {
  // wait before closing (important)
  await this.page.waitForTimeout(1000);
  await this.browser.close();
});