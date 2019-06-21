import templates from "./templates.json";
import Images from "./Images";


class Template {

  get imagePath() {
    return this._template.templateImagePath
  }

  get image() {
    return this.imageLoader.image(this._template.templateImagePath)
  }

  get targetCoordinates() {
    return this._template.targetCoordinates
  }

  constructor(templateId) {
    this.imageLoader = new Images()
    this._template = templates[templateId]
  }

  toString() {
    return `ImagePath: ${this.imagePath}\nCoordinates: ${JSON.stringify(this.targetCoordinates)}`
  }

  static get IPHONE_1() {
    return new Template('Iphone')
  }
  static get IPHONE_2() {
    return new Template('Iphone_2')
  }
}

export default Template