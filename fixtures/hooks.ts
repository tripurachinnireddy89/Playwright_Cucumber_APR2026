import { Before, AfterStep, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';



Before(async function () {

  const headless = process.env.HEADLESS === 'true' || process.env.CI === 'true';

  this.browser = await chromium.launch({ headless });

  this.context = await this.browser.newContext({
    recordVideo: {
      dir: 'reports/videos/',   // 👈 videos folder
      size: { width: 1280, height: 720 }
    }
  });

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

  let videoPath;

  if (this.page) {
    videoPath = await this.page.video()?.path();
  }

  if (this.context) {
    await this.context.close(); // 👈 saves video
  }

  if (videoPath) {
    const fs = require('fs');
    const videoBuffer = fs.readFileSync(videoPath);
    await this.attach(videoBuffer, 'video/webm');
  }

  if (this.browser) {
    await this.browser.close();
  }

});