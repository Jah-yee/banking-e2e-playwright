import { Page, Locator } from '@playwright/test';

export class BudgetPage {
  readonly page: Page;
  readonly name: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly budgetType: Locator;
  readonly budgetAmount: Locator;
  readonly budgetAttachments: Locator

  constructor(page: Page) {
    this.page = page;

    this.name = page.locator('#ffInput_name');
    this.submitButton = page.locator('.btn-success');
    this.successMessage = page.locator('.alert-success');
    this.budgetType = page.locator('#ffInput_auto_budget_type');
    this.budgetAmount = page.locator('#ffInput_auto_budget_amount');
    this.budgetAttachments = page.locator('#ffInput_attachments');

    
  }

  async goto() {
    await this.page.goto('/budgets/create');
  }

  async create(name: string) {
    await this.name.fill(name);
    await this.submitButton.click();
  }


  async createBudgetType(name: string, autoBudget: string, amount: string) {
  await this.name.fill(name)
  await this.budgetType.selectOption(autoBudget)
  await this.budgetAmount.fill(amount)
  await this.submitButton.click();
  }

 async createAttachments(name: string, autoBudget: string, amount:string) {
  await this.name.fill(name);
  await this.budgetType.selectOption(autoBudget)
  await this.budgetAmount.fill(amount);
  await this.budgetAttachments.setInputFiles('test-data/image.png');
  await this.submitButton.click();

 }
}