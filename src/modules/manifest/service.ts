import { readFileSync } from 'fs'

export const packageJson = JSON.parse(readFileSync('package.json').toString())
