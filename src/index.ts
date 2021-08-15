import 'reflect-metadata'
import { createConnection } from 'typeorm'

import Server from './Server'

/**
 * Application initialization.
 */
async function app() {

  createConnection().then(() => {
    // Run express server.
    new Server().listen()
  }).catch(error => {
    console.log(error)
  })
}

app()
