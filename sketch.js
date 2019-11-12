// noprotect
let imgs = {}; // Declare variable 'img'.
let pos = 0;
let posy = 100;
let temperature = -55;

function preload() {
  loadJSON(
    "https://api.darksky.net/forecast/47c38c2ea901f7bdb4b163a3d56d4459/50.8549541,4.3053507?units=si",
    gotMeteo,
    "jsonp"
  );
}

function gotMeteo(data) {
  console.log("temperature :", data.currently.temperature);
  temperature = data.currently.temperature;
  setTimeout(preload, 60000);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let folder of ["cold", "coold", "cooold", "hot", "hoot", "hooot"]) {
    imgs[folder] = {};
    for (let i = 0; i < 26; i++) {
      let char = (10 + i).toString(36);
      let filename = "img/" + folder + "/" + char + ".png";
      imgs[folder][char] = loadImage(
        filename,
        () => {
          console.log(`${filename} loaded`);
        },
        () => {
          console.error(`${filename} missing`);
        }
      );
    }
  }
}

function keyPressed() {
  fill(255);
  text("temperature : " + temperature + " °C", 10, 20);
  if (" " === key) {
    pos += 100;
  } else if ("Enter" === key) {
    posy += 100;
    pos = 0;
  } else {
    try {
      if (temperature < 0) {
        image(imgs.cooold[key], pos, posy);
        pos += imgs.cooold[key].width;
      } else if (temperature < 5) {
        image(imgs.coold[key], pos, posy);
        pos += imgs.coold[key].width;
      } else if (temperature < 10) {
        image(imgs.cold[key], pos, posy);
        pos += imgs.cold[key].width;
      } else if (temperature < 15) {
        image(imgs.hot[key], pos, posy);
        pos += imgs.hot[key].width;
      } else if (temperature < 20) {
        image(imgs.hoot[key], pos, posy);
        pos += imgs.hoot[key].width;
      } else {
        image(imgs.hooot[key], pos, posy);
        pos += imgs.hooot[key].width;
      }
    } catch (err) {
      console.error(err);
      background(0);
      pos = 0;
      posy = 100;
    }
  }
}
