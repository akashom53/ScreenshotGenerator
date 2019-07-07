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
      let scale = window.innerHeight / bgImage.height
      console.log(scale)
      canvas.style.transform = `scale(${scale})`
      canvas.style.transformOrigin = 'top left'

      let container = this.refs.container
      container.style.overflow = 'hidden'
      container.style.height = '100vh'
    }
    bgImage.src = template.image
  }

  render() {
    return (
      <div ref='container'>
        <canvas ref="canvas" />
      </div>
    )
  }
}


export default ScreenshotGenerator