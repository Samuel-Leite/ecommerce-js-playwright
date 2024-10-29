const { test } = require('@playwright/test')
const LoginPage = require('../pages/loginPage')
const HomePage = require('../pages/homePage')
const ProductsPage = require('../pages/productsPage')
const CartPage = require('../pages/cartPage')
const userData = require('../../fixtures/userData.json')
require('../../helpers/hooks')

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
  await cartPage.doPaymentLogin()
  await homePage.doLogout()
})

test('@smoke Validar compra de roupas sem logar na plataforma com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page)
  const productsPage = new ProductsPage(page)
  const cartPage = new CartPage(page)

  await loginPage.goto()
  await homePage.goToProducts()
  await productsPage.selectMenTShirts()
  await productsPage.selectMenJeans()
  await homePage.goToCard()
  await cartPage.doPaymentNoLogin(userData.email, userData.password)
  await homePage.doLogout()
})
