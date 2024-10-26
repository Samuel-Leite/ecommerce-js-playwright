const { beforeEach, afterEach } = require('@playwright/test')
const logger = require('./logger')
const userApi = require('./userApi')
const userData = require('../fixtures/userData.json')
const config = require('../playwright.config')
const userService = new userApi(config.use.baseURL)

beforeEach(async () => {
  logger.info('-----------------------------------------------------------------------')
  logger.info('--------------------------------Start----------------------------------')
  logger.clearLogFile()
  await userService.deleteUser(userData.email, userData.password)
  await userService.createUser(userData)
})

afterEach(async () => {
  logger.info('--------------------------------End----------------------------------')
  logger.info('-----------------------------------------------------------------------')
})
