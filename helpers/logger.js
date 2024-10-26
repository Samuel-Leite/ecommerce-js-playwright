const { createLogger, format, transports } = require('winston')
const fs = require('fs')

class Logger {
  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`
        })
      ),
      transports: [new transports.Console(), new transports.File({ filename: 'winston.log' })]
    })
  }

  clearLogFile() {
    try {
      fs.writeFileSync('winston.log', '', 'utf8')
      this.logger.info('Arquivo de log limpo com sucesso.') // Log da ação de limpar o arquivo
    } catch (error) {
      this.logger.error(`Falha ao limpar o arquivo de log: ${error.message}`) // Registra erro se a operação falhar
    }
  }

  info(message) {
    this.logger.info(message)
  }

  error(message) {
    this.logger.error(message)
  }
}

module.exports = new Logger()
