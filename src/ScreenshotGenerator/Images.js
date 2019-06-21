import iphone_1 from "./assets/iphone_1.png";
import iphone_2 from "./assets/iphone_2.jpg";

class Images {
  image(imagePath) {
    switch (imagePath) {
      case "./assets/iphone_1.png":
        return iphone_1
      case "./assets/iphone_2.jpg":
        return iphone_2
      default:
        throw new Error(`Image path invalid: ${imagePath}`)
    }
  }
}

export default Images