import { setup } from './server'
import { yellow } from 'colors'
import { packageJson } from './modules/manifest'

const port = parseInt(process.env.PORT || '3000')
setup().then((app) => {
  app.listen(port, () => {
    console.log(
      `🚀 ${packageJson.name}: Server listen on port ${yellow(`${port}`)}!`
    )
  })
})
