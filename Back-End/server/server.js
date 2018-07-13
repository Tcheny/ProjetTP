import express from 'express';
import logger from 'morgan';
import config from './config'

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`))
