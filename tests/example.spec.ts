import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as examples from './example';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // Abdelrahman Fahd
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
})

test('Dark Mode', async ({ page }) => {
  if (process.env.market === 'PT')
    await page.goto('https://www.google.dev/')
  await page.goto('https://playwright.dev/')
  expect("Ahmed").toBe('Fahd')
  console.log("Market is:" + process.env.market)
})


test('Udemy Test', async ({ page }) => {
  await page.goto('https://www.facebook.com')
  await page.waitForTimeout(3000)
})


test('Online Course Test2', async ({ page }) => {
  await page.goto("https://www.google.com")
  await page.waitForTimeout(3000)
})