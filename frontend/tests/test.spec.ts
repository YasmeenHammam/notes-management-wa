import { test, expect } from '@playwright/test'

test('Check the homepage with Notes Page header', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Notes Page');
});

test('Check Create User Form Visibility', async ({ page }) => {
    await page.goto('http://localhost:3000'); 
    const formsContainer = await page.$('.forms-container');
    expect(formsContainer).not.toBeNull();
    await expect(page.locator('input[name="create_user_form_name"]')).toBeVisible();
    await expect(page.locator('input[name="create_user_form_email"]')).toBeVisible();
    await expect(page.locator('input[name="create_user_form_username"]')).toBeVisible();
    await expect(page.locator('input[name="create_user_form_password"]')).toBeVisible();
    await expect(page.locator('button[name="create_user_form_create_user"]')).toBeVisible();
});

test('Check Login Form Visibility', async ({ page }) => {
    await page.goto('http://localhost:3000'); 
    const formsContainer = await page.$('.forms-container');
    expect(formsContainer).not.toBeNull();
    await expect(page.locator('input[name="login_form_username"]')).toBeVisible();
    await expect(page.locator('input[name="login_form_password"]')).toBeVisible();
    await expect(page.locator('button[name="login_form_login"]')).toBeVisible();
});

test('Create User Form Check the add button Visability', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const formsContainer = await page.$('.forms-container');
    expect(formsContainer).not.toBeNull();
    // filling the create user form
    await page.fill('input[name="create_user_form_name"]', 'Yasmin');
    await page.fill('input[name="create_user_form_email"]', 'Yasmin@example.com');
    await page.fill('input[name="create_user_form_username"]', 'Yasmin');
    await page.fill('input[name="create_user_form_password"]', 'Yasmin123');

    //checking the add button 
    await page.click('button[name="create_user_form_create_user"]');
    const addButton = page.locator('button[name="add_new_note"]');
    await expect(addButton).toBeHidden();
});

test('Login and Check the add button Visability ', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const formsContainer = await page.$('.forms-container');
    expect(formsContainer).not.toBeNull();

    // fill the login form 
    await page.fill('input[name="login_form_username"]', 'Yasmin');
    await page.fill('input[name="login_form_password"]', 'Yasmin123');
    await page.click('button[name="login_form_login"]');

    //checking the add button 
    const addButton =  page.locator('button[name="add_new_note"]');
    await expect(addButton).toBeVisible();
});