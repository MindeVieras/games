import { config } from 'dotenv'
import Joi from '@hapi/joi'

// Require variables from .env file.
config({
  // Make sure test environment has it's own .env file.
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

/**
 * Configuration interface.
 */
export interface IConfig {
  readonly env: 'development' | 'production' | 'test'
  readonly protocol: 'http' | 'https'
  readonly host: string
  readonly port: number
}

/**
 * Define validation for all the env vars.
 */
const envVarsSchema = Joi.object({
  // Environment variables.
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PROTOCOL: Joi.string()
    .valid('http', 'https')
    .default('http'),
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().default(3000),
})
  .unknown()
  .required()

/**
 * Validate env vars.
 */
const { error, value: envVars } = envVarsSchema.validate(process.env)

// Throw an error is validation is unsuccessful.
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

/**
 * Build config object.
 */
export const Config: IConfig = {
  env: envVars.NODE_ENV,
  protocol: envVars.PROTOCOL,
  host: envVars.HOST,
  port: envVars.PORT,
}
