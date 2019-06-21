import React from 'react';
import PerspectiveTransform from "./PerspectiveTransform";
import Template from "./Template";

class ScreenshotGenerator extends React.Component {

  componentDidMount() {
    let canvas = this.refs.canvas
    let image = this.refs.image
    let bgImage = this.refs.bgImage
    let template = Template.IPHONE_1
    bgImage.onload = () => {
      image.src = this.props.image
    }
    image.onload = () => {
      console.log(`${template}`)
      canvas.width = bgImage.width;
      canvas.height = bgImage.height;
      let p = new PerspectiveTransform(canvas, image, bgImage);
      p.draw(template.targetCoordinates);
    }
    bgImage.src = template.image


  }

  render() {
    return (
      <div>
        <canvas ref="canvas" />
        <img ref="bgImage" style={{ display: 'None' }} />
        <img ref="image" style={{ display: 'None' }} />
      </div>
    )
  }
}


export default ScreenshotGenerator