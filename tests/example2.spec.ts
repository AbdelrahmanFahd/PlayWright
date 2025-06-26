import { test, expect } from '@playwright/test';

test('light Mode', async ({ page }) => {
  console.log('PLAYWRIGHT HTML REPORT =============>' + process.env.PLAYWRIGHT_HTML_REPORT)
  await page.goto('https://www.google.com')
  if (process.env.market === 'IE') {
    console.log("Market is IE")
    expect.soft("Fahd").toBe('Ahmed')
    expect(process.env.market).toBe('IE')
  }

  expect("Ahmed").toBe('Ahmed')
})


test('Dark Mode', async ({ page }) => {
  if (process.env.market === 'PT') {
    await page.goto('https://www.google.com/')
    expect(process.env.market).toBe('PT')
  }
  await page.goto('https://playwright.dev/')
  console.log("Market is =============> " + process.env.market)
})