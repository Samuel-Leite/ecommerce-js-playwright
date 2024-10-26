const { expect } = require('@playwright/test')
const logger = require('../../helpers/logger')
const LoginPage = require('./loginPage')
const HomePage = require('./homePage')
const userData = require('../../fixtures/userData.json')
const Utils = require('../../helpers/utils')

class CartPage {
  constructor(page) {
    this.page = page
    this.loginPage = new LoginPage(page)
    this.homePage = new HomePage(page)
    this.utils = new Utils() // Instância de Utils sem passar 'page'
    this.btnCheckout = 'a.btn.btn-default.check_out'
    this.btnConfirmOrder = 'button[data-qa="pay-button"]'
    this.btnAuthentication = 'p.text-center a'
    this.txtNameCard = 'input[data-qa="name-on-card"]'
    this.txtCardNumber = 'input[data-qa="card-number"]'
    this.txtCVC = 'input[data-qa="cvc"]'
    this.txtMMExpiration = 'input[data-qa="expiry-month"]'
    this.txtYYYYExpiration = 'input[data-qa="expiry-year"]'
    this.confirmationMessage = "//div[@class='col-sm-9 col-sm-offset-1']/p"
  }

  async doPaymentLogin() {
    const cardDetails = this.utils.getCardDetails() // Alterado para 'this.utils'

    try {
      await this.page.click(this.btnCheckout)
      await this.page.click(this.btnCheckout)
      await this.page.fill(this.txtNameCard, 'Scrooge McDuck')
      await this.page.fill(this.txtCardNumber, cardDetails.cardNumber)
      await this.page.fill(this.txtCVC, cardDetails.cvc)
      await this.page.fill(this.txtMMExpiration, cardDetails.month)
      await this.page.fill(this.txtYYYYExpiration, `20${cardDetails.year}`)
      await this.page.click(this.btnConfirmOrder)

      const locator = this.page.locator(this.confirmationMessage)
      await expect(locator).toHaveText('Congratulations! Your order has been confirmed!')

      logger.info('A compra do produto foi concluído com sucesso.')
    } catch (error) {
      logger.error('Erro durante o processo de pagamento:', error.message)
    }
  }

  async doPaymentNoLogin(username, password) {
    const cardDetails = this.utils.getCardDetails() // Alterado para 'this.utils'

    try {
      await this.page.click(this.btnCheckout)
      await this.page.click(this.btnAuthentication)
      await this.loginPage.doLoginAfterChoosenProduct(username, password)
      await this.homePage.goToCard()
      await this.page.click(this.btnCheckout)
      await this.page.click(this.btnCheckout)
      await this.page.fill(this.txtNameCard, userData.name)
      await this.page.fill(this.txtCardNumber, cardDetails.cardNumber)
      await this.page.fill(this.txtCVC, cardDetails.cvc)
      await this.page.fill(this.txtMMExpiration, cardDetails.month)
      await this.page.fill(this.txtYYYYExpiration, `20${cardDetails.year}`)
      await this.page.click(this.btnConfirmOrder)

      const locator = this.page.locator(this.confirmationMessage)
      await expect(locator).toHaveText('Congratulations! Your order has been confirmed!')

      logger.info('A compra do produto foi concluído com sucesso.')
    } catch (error) {
      logger.error('Erro durante o processo de pagamento:', error.message)
    }
  }
}

module.exports = CartPage
