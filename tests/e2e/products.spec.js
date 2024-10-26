const { test } = require('@playwright/test')
const LoginPage = require('../pages/loginPage')
const HomePage = require('../pages/homePage')
const ProductsPage = require('../pages/productsPage')
const CartPage = require('../pages/cartPage')
const userApi = require('../../helpers/userApi')
const userData = require('../../fixtures/userData.json')
const config = require('../../playwright.config')
const logger = require('../../helpers/logger')
const userService = new userApi(config.use.baseURL)

test.beforeEach(async () => {
  logger.info('-----------------------------------------------------------------------');
  logger.info('--------------------------------Start----------------------------------');
  logger.clearLogFile();  
  await userService.deleteUser(userData.email, userData.password)
  await userService.createUser(userData)
});

test.afterEach(async () => {
  logger.info('--------------------------------End----------------------------------');
  logger.info('-----------------------------------------------------------------------');
});

test('@smoke Validar compra de roupas logado na plataforma com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page)
  const productsPage = new ProductsPage(page)
  const cartPage = new CartPage(page)

  await loginPage.doLogin(userData.email, userData.password)
  await homePage.goToProducts()
  await productsPage.selectMenTShirts()
  await productsPage.selectMenJeans()
  await homePage.goToCard()
  await cartPage.doPayment()

  await homePage.doLogout()
})
