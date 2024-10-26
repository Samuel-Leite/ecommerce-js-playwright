const { expect } = require('@playwright/test')
const logger = require('../../helpers/logger')

class LoginPage {
  constructor(page) {
    this.page = page
    this.txtEmail = 'input[data-qa="login-email"]'
    this.txtPassword = 'input[data-qa="login-password"]'
    this.btnLogin = 'button[data-qa="login-button"]'
    this.btnAuthentication = 'a:has-text("Signup / Login")'
    this.txtError = 'div[data-qa="login-error-message"]'
  }

  async goto() {
    try {
      await this.page.goto('/')
      logger.info('Navegou para a página inicial com sucesso.')
    } catch (error) {
      logger.error('Erro ao navegar para a página inicial:', error.message)
    }
  }

  async doLogin(email, password) {
    try {
      await this.goto()

      await this.page.click(this.btnAuthentication)
      await this.page.fill(this.txtEmail, email)
      await this.page.fill(this.txtPassword, password)
      await this.page.click(this.btnLogin)

      logger.info('As credenciais do login foram preenchidas com sucesso.')
    } catch (error) {
      logger.error('Erro ao preencher as credenciais do login:', error.message)
    }
  }

  async validateErrorMessageLogin(text) {
    try {
      await this.page.waitForSelector('form p', { state: 'visible' })
      const errorMessage = await this.page
        .locator('form p')
        .filter({ hasText: 'Your email or password is incorrect!' })
        .textContent()
      expect(errorMessage).toBe(text)

      logger.info(
        'A mensagem de erro ao informar as credenciais invalidas foi validada com sucesso'
      )
    } catch (error) {
      // Log de erro se a validação falhar
      logger.error(
        'Erro ao validar a mensagem ao logar com as credenciais invalidas:',
        error.message
      )
      throw error // Repassa o erro para que o teste falhe corretamente
    }
  }
}

module.exports = LoginPage
