import { test, expect } from '@playwright/test';
test.use({ video: 'on' });
test('login and switch team', async ({ page }) => {
  // Go to the dashboard URL
  await page.goto('http://income-expense.test/ankit-gondaliyas-team/dashboard');

  // Check if we see the login page, then fill in details and submit
  if (page.url().includes('/login') || await page.locator('input[type="email"]').isVisible()) {
    await page.locator('input[type="email"]').fill('ankitgondaliya31@gmail.com');
    await page.locator('input[type="password"]').fill('Ankit@5638');
    await page.locator('button[type="submit"]').click();
  }

  // Locate the team switcher in the left sidebar and click it
  const teamSwitcher = page.locator('[data-test="team-switcher-trigger"]');
  await expect(teamSwitcher).toBeVisible();
  await teamSwitcher.click();

  // Click on "team 2" in the dropdown items list
  const teamOption = page.locator('[data-test="team-switcher-item"]').filter({ hasText: 'team 2' });
  await expect(teamOption).toBeVisible();
  await teamOption.click();

  // Assert we successfully navigated to the new team's dashboard
  await expect(page).toHaveURL(/team-2\/dashboard/);
});
