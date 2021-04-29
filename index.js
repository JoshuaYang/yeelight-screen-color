const { resolve } = require('path')
const ColorThief = require('colorthief')
const screenshot = require('screenshot-desktop')
const Color = require('color')
const Yeelight = require('yeelight2')

const imgPath = resolve(process.cwd(), 'screenshot.jpg')
let currentLight

async function run() {
  await screenshot({ filename: imgPath })

  const rgbArray = await ColorThief.getColor(imgPath)
  const color = Color.rgb(rgbArray)

  console.log(color.rgbNumber())

  currentLight.set_rgb(color.rgbNumber(), 'smooth', 500)

  setTimeout(run, 1500)
}

// run()

Yeelight.discover((light) => {
  console.log('==== light ====', light)

  currentLight = light

  run()
})
