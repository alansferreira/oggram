import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

const parsedEnv = config({ override: false })
expand(parsedEnv)
