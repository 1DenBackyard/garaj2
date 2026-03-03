import { test, expect } from '@playwright/test';
test('home sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('home-full.png', { fullPage: true });
});
