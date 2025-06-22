import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as examples from './example';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

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
  await page.goto('https://playwright.dev/')
  const result = await new AxeBuilder({ page })
    .disableRules(['empty-heading'])
    .analyze()
  console.log(result.violations)
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  console.log(accessibilityScanResults.violations)
})