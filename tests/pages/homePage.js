const logger = require('../../helpers/logger')

class HomePage {
  constructor(page) {
    this.page = page
    this.btnLogou = 'a:has-text("Logout")'
    this.btnProducts = 'a:has-text("Products")'
    this.btnCard = 'a:has-text("Cart")'
  }

  async doLogout() {
    try {
      await this.page.click(this.btnLogou)
      logger.info('Logout realizado com sucesso.')
    } catch (error) {
      logger.error('Erro ao realizar logout:', error.message)
    }
  }

  async goToProducts() {
    try {
      await this.page.click(this.btnProducts)
      logger.info('Navegou para a página de produtos com sucesso.')
    } catch (error) {
      logger.error('Erro ao navegar para a página de produtos:', error.message)
    }
  }

  async goToCard() {
    try {
      await this.page.click(this.btnCard)
      logger.info('Navegou para a página do carrinho com sucesso.')
    } catch (error) {
      logger.error('Erro ao navegar para a página do carrinho:', error.message)
    }
  }
}

module.exports = HomePage
