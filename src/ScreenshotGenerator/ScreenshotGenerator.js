import React from 'react';
import PerspectiveTransform from "./PerspectiveTransform";
import Template from "./Template";

class ScreenshotGenerator extends React.Component {

  

  componentDidMount() {
    let canvas = this.refs.canvas
    let image = new Image()
    let bgImage = new Image()
    let template = this.props.template
    bgImage.onload = () => {
      image.src = this.props.image
    }
    image.onload = () => {
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
      </div>
    )
  }
}


export default ScreenshotGenerator