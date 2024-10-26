const logger = require('../../helpers/logger')

class ProductsPage {
  constructor(page) {
    this.page = page
    this.btnCategoryMen = 'a[href="#Men"] .fa'
    this.btnTShirts = 'a:has-text("Tshirts")'
    this.btnJeans = 'a:has-text("Jeans")'
    this.btnProductTShirts = '[data-product-id="2"]'
    this.btnProductFitJeans = '[data-product-id="35"]'
    this.btnContinueShopping = 'button:has-text("Continue Shopping")'
  }

  async selectMenClothing() {
    try {
      await this.page.click(this.btnCategoryMen)
      logger.info('Categoria de roupas masculinas selecionada com sucesso.')
    } catch (error) {
      logger.error('Erro ao selecionar a categoria de roupas masculinas:', error.message)
    }
  }

  async selectMenTShirts() {
    try {
      await this.selectMenClothing()
      await this.page.click(this.btnTShirts)
      logger.info('Categoria de camisetas masculinas selecionada com sucesso.')

      await this.page.click(this.btnProductTShirts)
      logger.info('Produto de camiseta masculina selecionado com sucesso.')

      await this.page.click(this.btnContinueShopping)
      logger.info('Continuar comprando clicado com sucesso.')
    } catch (error) {
      logger.error('Erro ao selecionar camisetas masculinas:', error.message)
    }
  }

  async selectMenJeans() {
    try {
      await this.selectMenClothing()
      await this.page.click(this.btnJeans)
      logger.info('Categoria de jeans masculinos selecionada com sucesso.')

      await this.page.click(this.btnProductFitJeans)
      logger.info('Produto de jeans masculinos selecionado com sucesso.')

      await this.page.click(this.btnContinueShopping)
      logger.info('Continuar comprando clicado com sucesso.')
    } catch (error) {
      logger.error('Erro ao selecionar jeans masculinos:', error.message)
    }
  }
}

module.exports = ProductsPage
