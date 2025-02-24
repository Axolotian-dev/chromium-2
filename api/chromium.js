const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  let browser = null;

  try {
    // Launch headless Chromium in its own secure sandbox.
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    // Navigate to your target URL (modify as needed).
    await page.goto('https://example.com', { waitUntil: 'networkidle2' });

    // Retrieve page content.
    const content = await page.content();

    res.status(200).send(content);
  } catch (error) {
    console.error('Error launching Chromium:', error);
    res.status(500).send('Oops! Even Chromium-2 can have an off day.');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
