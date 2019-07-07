import React from 'react';
import PerspectiveTransform from "./PerspectiveTransform";

class ScreenshotGenerator extends React.Component {

  getImage = (callback) => {
    let canvas = document.createElement('canvas')
    let image = new Image()
    let bgImage = new Image()
    let template = this.props.template
    bgImage.onload = () => {
      image.src = this.props.image
    }
    image.onload = () => {
      canvas.width = bgImage.width;
      canvas.height = bgImage.height;
      let p = new PerspectiveTransform(canvas, image, bgImage, this.props.color);
      p.draw(template.targetCoordinates);
      callback(canvas.toDataURL('image/png'))
    }
    bgImage.src = template.image
  }

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
    canvas.style.background = this.props.color
  }

  componentDidUpdate() {
    this.refs.canvas.style.background = this.props.color
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