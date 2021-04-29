const { resolve } = require('path')
const ColorThief = require('colorthief')
const screenshot = require('screenshot-desktop')
const Color = require('color')
const Jimp = require('jimp')
const Yeelight = require('yeelight2')

const imgPath = resolve(process.cwd(), 'screenshot.jpg')
let currentLight

async function run() {
  await screenshot({ filename: imgPath })

  const image = await Jimp.read(imgPath)
  // await image.resize(500, Jimp.AUTO)
  await image.quality(10)
  await image.writeAsync(imgPath)

  const rgbArray = await ColorThief.getColor(imgPath)
  const color = Color.rgb(rgbArray)

  console.log(color.rgbNumber())

  // currentLight.set_rgb(color.rgbNumber(), 'smooth', 500)

  setTimeout(run, 1500)
}

run()

// Yeelight.discover((light) => {
//   console.log('==== light ====', light)

//   currentLight = light

//   run()
// })
