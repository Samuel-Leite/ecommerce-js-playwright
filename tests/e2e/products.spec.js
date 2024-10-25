const { test } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');
const ProductsPage = require('../pages/productsPage');
const CartPage = require('../pages/cartPage');
const apiHelper = require('../../helpers/apiHelper');
const userData = require('../../fixtures/userData.json');
const config = require('../../playwright.config');

test('Validar compra de roupas logado na plataforma com sucesso', async ({ page }) => {

  const userService = new apiHelper(config.use.baseURL)
  const loginPage = new LoginPage(page);  
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await userService.deleteUser(userData.email, userData.password);
  await userService.createUser(userData)
  
  await loginPage.doLogin(userData.email,userData.password)
  await homePage.goToProducts()
  await productsPage.selectMenTShirts()
  await productsPage.selectMenJeans()
  await homePage.goToCard()
  await cartPage.doPayment()

  await homePage.doLogout()
});
