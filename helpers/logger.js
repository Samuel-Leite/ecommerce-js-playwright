const { createLogger, format, transports } = require('winston')

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
      transports: [new transports.Console(), new transports.File({ filename: 'app.log' })]
    })
  }

  info(message) {
    this.logger.info(message)
  }

  error(message) {
    this.logger.error(message)
  }
}

module.exports = new Logger()
