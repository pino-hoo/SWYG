// ** Nest Imports
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

// ** Custom Module Imorts
import { AppModule } from './app.module'
import LoggerService from './utils/logger/logger.service'

// ** Other Imports
import * as cookieParser from 'cookie-parser'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  })
  app.useLogger(app.get(LoggerService))
  app.enableCors()
  app.use('/src/source/img', express.static('./src/source/img'))
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ limit: '50mb', extended: true }))
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  await app.listen(process.env.NODE_SERVER_PORT || 8003)
}
bootstrap()
