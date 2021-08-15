import compression from 'compression'
import helmet from 'helmet'
import express, { Application, Request, Response } from 'express'
import exphbs from 'express-handlebars'
import morgan from 'morgan'

import { Config } from './Config'

/**
 * Server class.
 *
 * @class
 */
export default class Server {
  /**
   * Setup express app.
   */
  public app: Application = express()

  /**
   * Server base url.
   */
  public static baseUrl = `${Config.protocol}://${Config.host}:${Config.port}`

  constructor() {
    // Add some extra security to the API.
    this.app.use(helmet())

    // Compresses requests.
    this.app.use(compression())

    // Body parser.
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Set template engine
    this.app.engine('.hbs', exphbs({ extname: '.hbs' }))
    this.app.set('view engine', '.hbs')

    // Middleware only for dev environment.
    if (Config.env === 'development') {
      // Dev logger.
      this.app.use(morgan('dev'))
    }

    // Home route.
    this.app.get('/', (req: Request, res: Response) => {
      res.render('home')
    })

  }

  /**
   * Start HTTP server.
   *
   * @param {number} port
   *   Optional port number.
   */
  public listen(port?: number): void {
    this.app.listen(port ?? Config.port, () => {
      // Log about success server start only for dev environment.
      if (Config.env === 'development') {
        console.log(`Server running at ${Server.baseUrl}`)
      }
      return this.app
    })
  }
}
