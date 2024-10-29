const { beforeAll, beforeEach, afterEach } = require('@playwright/test')
const fs = require('fs/promises') // Para usar Promises
const path = require('path') // Para trabalhar com caminhos de arquivos
const logger = require('./logger')
const userApi = require('./userApi')
const userData = require('../fixtures/userData.json')
const config = require('../playwright.config')
const userService = new userApi(config.use.baseURL)

// Função para limpar os resultados do Allure
async function cleanAllureResults() {
  const allureResultsDir = path.join(__dirname, '..', 'allure-results')
  try {
    await fs.rm(allureResultsDir, { recursive: true, force: true })
    logger.info('Diretório allure-results limpo com sucesso!')
  } catch (err) {
    logger.error(`Erro ao remover o diretório allure-results: ${err.message}`)
  }
}

// Hook para configuração inicial
beforeAll(async () => {
  await cleanAllureResults() // Limpa o diretório do Allure apenas uma vez
  logger.clearLogFile() // Limpa o log antes de todos os testes
})

// Hook para cada teste
beforeEach(async () => {
  logger.info('-----------------------------------------------------------------------')
  logger.info('--------------------------------Start----------------------------------')

  // Limpeza e criação do usuário antes de cada teste
  await userService.deleteUser(userData.email, userData.password)
  await userService.createUser(userData)
})

// Hook para finalização de cada teste
afterEach(async () => {
  logger.info('--------------------------------End----------------------------------')
  logger.info('-----------------------------------------------------------------------')
})
