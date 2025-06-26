import { test } from '@playwright/test';

test('global setup', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.context().storageState({ path: 'tests/StorageState.json' });
});