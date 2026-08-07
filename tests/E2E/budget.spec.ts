import { test, expect } from '@playwright/test';
import { BudgetPage } from '../../pages/budget-page';
import { LoginPage } from '../../pages/login-page';
import { BudgetlistPage } from '../../pages/budgetlist-page';
import { WithdrawalPage } from '../../pages/withdrawal-page';
import { createBudgetName } from '../../utils/dataFactory';
import { createDBConnection } from '../../utils/db';
import { transactionName } from '../../utils/dataFactory';

test('e2e flow for budget', async ({ page }) => {
  const budgetName = createBudgetName();
  const connection = await createDBConnection();
  const transactionDescription = transactionName();

  const loginPage = new LoginPage(page);
  const budgetPage = new BudgetPage(page);
  const withdrawalPage = new WithdrawalPage(page);
  const budgetlistPage = new BudgetlistPage(page);

  await loginPage.goto();
  await loginPage.login('test@test.ro', 'testtesttesttest');

  await budgetPage.goto();
  await budgetPage.create(budgetName);

  await expect(budgetPage.successMessage).toContainText('Succes!');



const [budgetDb] = await (connection as any).query(
  'SELECT * FROM budgets WHERE name = ?',
  [budgetName]
);

expect(budgetDb.length).toBeGreaterThan(0);



await withdrawalPage.goto();
await withdrawalPage.create(transactionDescription, '100', 'cont unu', budgetName);
console.log('Generated description:', transactionDescription);
await expect(withdrawalPage.successMessage).toContainText('Succes!');

 const [transactionDb] = await (connection as any).query(
 'SELECT * FROM transaction_journals WHERE description = ?',
  [transactionDescription]
);

expect(transactionDb.length).toBeGreaterThan(0);
expect(transactionDb[0].description).toBe(transactionDescription);
await connection.end();



await budgetlistPage.goto();
await page.getByRole('link', { name: budgetName }).click();
await expect(page.getByText(transactionDescription)).toBeVisible();
});