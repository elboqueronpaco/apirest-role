import 'reflect-metadata'
import {createConnection} from 'typeorm'
import * as express from 'express'
import * as cors from 'cors'
import * as helmet from 'helmet'
import router from './routes'
const port = process.env.PORT || 4000

createConnection().then(async () => {

    // create express app
    const app = express()

    // Middlewares
    app.use(cors())
    app.use(helmet())
    app.use(express.json());

    // register express routes from defined application routes
    app.use('/api', router)

    // setup express app here
    // ...

    // start express server
    app.listen(port)
    console.log(`Express server has started on port ${port}. Open http://localhost:${port}/api to see results`);

}).catch(error => console.log(error));
