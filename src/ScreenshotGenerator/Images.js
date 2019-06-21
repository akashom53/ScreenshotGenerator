import iphone_1 from "./assets/iphone_1.png";

class Images {
  image(imagePath) {
    switch (imagePath) {
      case "./assets/iphone_1.png":
        return iphone_1
      default:
        throw new Error(`Image path invalid: ${imagePath}`)
    }
  }
}

export default Images