import { test, expect } from '@playwright/test';
test('admin login', async ({ page }) => {
  await page.goto('/admin/login');
  await expect(page).toHaveScreenshot('admin-login.png', { fullPage: true });
});
