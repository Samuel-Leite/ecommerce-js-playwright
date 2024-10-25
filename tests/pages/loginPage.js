const logger = require("../../helpers/logger");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.txtEmail = 'input[data-qa="login-email"]';
    this.txtPassword = 'input[data-qa="login-password"]';
    this.btnLogin = 'button[data-qa="login-button"]';
  }

  async goto() {
    try {
      await this.page.goto("/");
      logger.info("Navegou para a página inicial com sucesso.");
    } catch (error) {
      logger.error("Erro ao navegar para a página inicial:", error.message);
    }
  }

  async doLogin(email, password) {
    try {
      await this.goto();

      await this.page.click('a:has-text("Signup / Login")');
      await this.page.fill(this.txtEmail, email);
      await this.page.fill(this.txtPassword, password);
      await this.page.click(this.btnLogin);

      logger.info("Login realizado com sucesso.");
    } catch (error) {
      logger.error("Erro ao realizar o login:", error.message);
    }
  }
}

module.exports = LoginPage;
