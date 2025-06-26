import { test } from '@playwright/test';

test('global setup', async ({ page }) => {
  await page.goto('https://www.udemy.com/home/my-courses/lists/');
  await page.context().storageState({ path: 'tests/StorageState.json' });
});