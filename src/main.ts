import { setup } from './server'

const port = parseInt(process.env.PORT || '3000')

setup().then((app) => {
  app.listen(port, () => {
    console.log(`Server listen on port {${port}}🚀!`)
  })
})
