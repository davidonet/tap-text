// noprotect
let imgs = {} // Declare variable 'img'.
let pos = 0
let temperature = -55

function preload() {
  loadJSON(
    'https://api.darksky.net/forecast/47c38c2ea901f7bdb4b163a3d56d4459/50.8549541,4.3053507?units=si',
    gotMeteo,
    'jsonp'
  )
}

function gotMeteo(data) {
  console.log('temperature :', data.currently.temperature)
  temperature = data.currently.temperature
  setTimeout(preload, 60000)
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  for (let folder of ['cold', 'coold', 'cooold', 'hot', 'hoot', 'hooot']) {
    imgs[folder] = {}
    for (let i = 0; i < 26; i++) {
      let char = (10 + i).toString(36)
      let filename = 'img/' + folder + '/' + char + '.png'
      imgs[folder][char] = loadImage(
        filename,
        () => {
          console.log(`${filename} loaded`)
        },
        () => {
          console.error(`${filename} missing`)
        }
      )
    }
  }
}

function draw() {}

function keyPressed() {
  text('temperature : ' + temperature + ' °C', 10, 300)
  if (' ' === key) {
    pos += 100
  } else {
    try {
      if (temperature < 0) {
        image(imgs.cooold[key], pos, windowHeight / 2)
        pos += imgs.cooold[key].width
      } else if (temperature < 5) {
        image(imgs.coold[key], pos, windowHeight / 2)
        pos += imgs.coold[key].width
      } else if (temperature < 10) {
        image(imgs.cold[key], pos, windowHeight / 2)
        pos += imgs.cold[key].width
      } else if (temperature < 15) {
        image(imgs.hot[key], pos, windowHeight / 2)
        pos += imgs.hot[key].width
      } else if (temperature < 20) {
        image(imgs.hoot[key], pos, windowHeight / 2)
        pos += imgs.hoot[key].width
      } else {
        image(imgs.hooot[key], pos, windowHeight / 2)
        pos += imgs.hooot[key].width
      }
    } catch (err) {
      console.error(err)
      background(255)
      pos = 0
    }
  }
}
