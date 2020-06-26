import dotenv from 'dotenv'
import {resolve as resolvePath} from 'path'

let fileEnv = 'env.local'

switch(process.env.NODE_ENV){
    case 'development':
        fileEnv = '.env.development.local'
        break
    case 'test':
        fileEnv = '.env.test.local'
        break
}

dotenv.config({
    path: resolvePath(__dirname, '..', '..', fileEnv)
})