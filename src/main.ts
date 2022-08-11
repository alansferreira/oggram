import { setup } from './server'
import { red, yellow } from 'colors'
import { packageJson } from './modules/manifest'
import { client } from './modules/db'
import { config } from 'dotenv'

config({ override: false })

const { MONGODB_URI } = process.env

const port = parseInt(process.env.PORT || '3000')
setup().then(async (app) => {
  try {
    await client.connect()
    console.log(`Database connection success!`)
  } catch (error) {
    if (error) {
      console.error(`Database connection error from ${red(MONGODB_URI)}`)
      console.error()
      console.error(error)
      process.exit(1)
    }
  }

  app.listen(port, () => {
    console.log(
      `🚀 ${packageJson.name}: Server listen on port ${yellow(`${port}`)}!`
    )
  })
})
