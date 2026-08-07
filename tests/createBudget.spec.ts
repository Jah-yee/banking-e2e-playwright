import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { BudgetPage } from '../pages/budget-page'
import { BudgetName, createBudgetName } from '../utils/dataFactory';

test('Create a budget', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const budgetPage = new BudgetPage(page);

  const budgetName = BudgetName();

  await loginPage.goto();
  await loginPage.login('test@test.ro', 'testtesttesttest');

  await budgetPage.goto();
  await budgetPage.create(budgetName);
});


test('Create a budget with autobudget', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const budgetPage = new BudgetPage(page);

  const budgetName = BudgetName();

  await loginPage.goto();
  await loginPage.login('test@test.ro', 'testtesttesttest');

  await budgetPage.goto();
  await budgetPage.createBudgetType(budgetName, '1', '1000');
});

test('Create a budget with attachments', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const budgetPage = new BudgetPage(page);

  const budgetName = BudgetName();

  await loginPage.goto();
  await loginPage.login('test@test.ro', 'testtesttesttest');

  await budgetPage.goto();
  await budgetPage.creatAattachments(budgetName, '1', '1000');
});