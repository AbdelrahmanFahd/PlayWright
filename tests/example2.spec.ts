import { test, expect } from '@playwright/test';

test('light Mode', async ({ page }) => {
  console.log('=============>'+process.env.PLAYWRIGHT_HTML_REPORT)
  await page.goto('https://www.google.com')
  if (process.env.market === 'IE')
    expect("Fahd").toBe('Ahmed')
  expect("Ahmed").toBe('Ahmed')
})


test('Dark Mode', async ({ page }) => {
  if (process.env.market === 'PT')
    await page.goto('https://www.google.com/')
  await page.goto('https://playwright.dev/')
  console.log("Market is:" + process.env.market)
})