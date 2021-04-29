const { resolve } = require('path')
const ColorThief = require('colorthief')
const screenshot = require('screenshot-desktop')
const Color = require('color')
const Jimp = require('jimp')
const Yeelight = require('yeelight2')

const imgPath = resolve(process.cwd(), 'screenshot.jpg')

const light = new Yeelight('192.168.3.97')

async function run() {
  await screenshot({ filename: imgPath })

  const image = await Jimp.read(imgPath)
  await image.resize(200, Jimp.AUTO)
  // await image.quality(8)
  await image.writeAsync(imgPath)

  const rgbArray = await ColorThief.getColor(imgPath)
  const color = Color.rgb(rgbArray)
  const rgbNumber = color.rgbNumber()

  console.log(rgbNumber)

  light.set_rgb(rgbNumber)

  run()
}

run()
