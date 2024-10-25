const { test } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');
const ProductsPage = require('../pages/productsPage');
const CartPage = require('../pages/cartPage');
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