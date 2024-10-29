const { beforeAll, beforeEach, afterEach } = require('@playwright/test')
const fs = require('fs/promises')
const path = require('path')
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
    logger.info('-----------------------------------------------------------------------')
    logger.info('Diretório allure-results limpo com sucesso!')
  } catch (err) {
    logger.error(`Erro ao remover o diretório allure-results: ${err.message}`)
  }
}

beforeAll(async () => {
  await cleanAllureResults()
  logger.clearLogFile()
})

beforeEach(async () => {
  logger.info('-----------------------------------------------------------------------')
  logger.info('--------------------------------Start----------------------------------')

  await userService.deleteUser(userData.email, userData.password)
  await userService.createUser(userData)
})

afterEach(async () => {
  logger.info('--------------------------------End----------------------------------')
  logger.info('-----------------------------------------------------------------------')
})
