const { expect } = require('@playwright/test')
const logger = require('../../helpers/logger')

class CartPage {
  constructor(page) {
    this.page = page
    this.btnCheckout = 'a.btn.btn-default.check_out'
    this.btnConfirmOrder = 'button[data-qa="pay-button"]'
    this.txtNameCard = 'input[data-qa="name-on-card"]'
    this.txtCardNumber = 'input[data-qa="card-number"]'
    this.txtCVC = 'input[data-qa="cvc"]'
    this.txtMMExpiration = 'input[data-qa="expiry-month"]'
    this.txtYYYYExpiration = 'input[data-qa="expiry-year"]'
    this.confirmationMessage = "//div[@class='col-sm-9 col-sm-offset-1']/p"
  }

  async doPayment() {
    try {
      await this.page.click(this.btnCheckout)
      await this.page.click(this.btnCheckout)
      await this.page.fill(this.txtNameCard, 'Scrooge McDuck')
      await this.page.fill(this.txtCardNumber, '0123456789')
      await this.page.fill(this.txtCVC, '123')
      await this.page.fill(this.txtMMExpiration, '12')
      await this.page.fill(this.txtYYYYExpiration, '2024')
      await this.page.click(this.btnConfirmOrder)

      // Use 'this.confirmationMessage' to reference the instance variable
      const locator = this.page.locator(this.confirmationMessage)
      await expect(locator).toHaveText('Congratulations! Your order has been confirmed!')

      logger.info('A compra do produto foi concluido com sucesso.')
    } catch (error) {
      logger.error('Erro durante o processo de pagamento:', error.message)
    }
  }
}

module.exports = CartPage
