const { test } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');
const apiHelper = require('../../helpers/apiHelper');
const userData = require('../../fixtures/userData.json');
const config = require('../../playwright.config');

test('Validar o login e o logout com sucesso', async ({ page }) => {

  const userService = new apiHelper(config.use.baseURL)
  const loginPage = new LoginPage(page);  
  const homePage = new HomePage(page);

  await userService.deleteUser(userData.email, userData.password);
  await userService.createUser(userData)
  
  await loginPage.doLogin(userData.email,userData.password)
  await homePage.doLogout()
});

test('Validar o login com credenciais invalidas', async ({ page }) => {
  const loginPage = new LoginPage(page);  
  
  await loginPage.doLogin('horatio@gmail.com','horatio123')
  await loginPage.validateErrorMessageLogin('Your email or password is incorrect!')
});