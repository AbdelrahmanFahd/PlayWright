import { test, expect } from '@playwright/test';

test('light Mode', async ({ page }) => {
  await page.goto('https://www.google.com')
  expect("Ahmed").toBe('fahd')
})


test('Dark Mode', async ({ page }) => {
  if (process.env.market === 'PT')
    await page.goto('https://www.google.com/')
  await page.goto('https://playwright.dev/')
  console.log("Market is:" + process.env.market)
})