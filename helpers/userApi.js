const axios = require('axios')
const logger = require('./logger')

class userApi {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  async createUser(userData) {
    const apiUrl = `${this.api.defaults.baseURL}/api/createAccount`

    try {
      const response = await this.api.post(apiUrl, userData, {
        headers: {
          Referer: apiUrl
        }
      })

      if (response.status === 200) {
        logger.info(`User created successfully: ${JSON.stringify(response.data)}`)
      } else {
        logger.error(`User creation failed: ${JSON.stringify(response.data)}`)
      }

      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async deleteUser(email, password) {
    const apiUrl = `${this.api.defaults.baseURL}/api/deleteAccount`

    try {
      const response = await this.api.delete(apiUrl, {
        data: { email, password }
      })

      if (response.status === 200) {
        logger.info(`Account deleted successfully: ${JSON.stringify(response.data)}`)
      } else {
        logger.error(`Account deletion failed: ${JSON.stringify(response.data)}`)
      }

      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  handleError(error) {
    if (error.response) {
      logger.error(`Error: ${JSON.stringify(error.response.data)}`)
    } else {
      logger.error(`Error: ${error.message}`)
    }
  }
}

module.exports = userApi
