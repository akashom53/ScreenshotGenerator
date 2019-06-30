import React from 'react';
import PerspectiveTransform from "./PerspectiveTransform";
import Template from "./Template";

class ScreenshotGenerator extends React.Component {



  componentDidMount() {
    let canvas = this.refs.canvas
    let bgCanvas = this.refs.bgCanvas
    let image = new Image()
    let bgImage = new Image()
    let template = this.props.template
    bgImage.onload = () => {
      image.src = this.props.image
    }
    image.onload = () => {
      this.bgSize = {width: bgImage.width, height: bgImage.height}
      canvas.width = bgImage.width;
      canvas.height = bgImage.height;
      bgCanvas.width = bgImage.width * 0.4;
      bgCanvas.height = bgImage.height * 0.4;
      this.ctx = bgCanvas.getContext('2d')
      this.ctx.beginPath();
      this.ctx.rect(0, 0, bgImage.width, bgImage.height);
      this.ctx.fillStyle = this.props.bgColor
      this.ctx.fill();
      this.transformer = new PerspectiveTransform(canvas, image, bgImage, this.props.bgColor);
      this.transformer.draw(template.targetCoordinates);
    }
    bgImage.src = template.image


  }

  componentDidUpdate() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.bgSize.width, this.bgSize.height);
    this.ctx.fillStyle = this.props.bgColor
    this.ctx.fill();
  }

  render() {
    return (
      <div >
        <canvas ref="bgCanvas" style={{ position: 'absolute', top: 0, left: 0 }} />
        <canvas ref="canvas" style={{ position: 'absolute',  top: 0, left: 0 }} />
      </div>
    )
  }
}


export default ScreenshotGenerator