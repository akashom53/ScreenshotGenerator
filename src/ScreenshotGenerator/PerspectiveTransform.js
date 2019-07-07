/* eslint-disable */
class PerspectiveTransform {

  constructor(canvas, image, bgImage, bgColor) {
    this.bgImage = bgImage
    this.bgColor = bgColor
    this.ctxd = canvas.getContext('2d')
    this.cvso = document.createElement('canvas')
    this.cvso.width = parseInt(image.width)
    this.cvso.height = parseInt(image.height)
    this.ctxo = this.cvso.getContext('2d')
    this.ctxo.drawImage(image, 0, 0, this.cvso.width, this.cvso.height)
    var cvst = document.createElement('canvas')
    cvst.width = this.ctxd.canvas.width
    cvst.height = this.ctxd.canvas.height
    this.ctxt = cvst.getContext('2d')
  }


  draw(points) {
    var d0x = points[0][0]
    var d0y = points[0][1]
    var d1x = points[1][0]
    var d1y = points[1][1]
    var d2x = points[2][0]
    var d2y = points[2][1]
    var d3x = points[3][0]
    var d3y = points[3][1]
    var dims = [
      Math.sqrt(Math.pow(d0x - d1x, 2) + Math.pow(d0y - d1y, 2)),
      Math.sqrt(Math.pow(d1x - d2x, 2) + Math.pow(d1y - d2y, 2)),
      Math.sqrt(Math.pow(d2x - d3x, 2) + Math.pow(d2y - d3y, 2)),
      Math.sqrt(Math.pow(d3x - d0x, 2) + Math.pow(d3y - d0y, 2))
    ]
    //
    var ow = this.cvso.width
    var oh = this.cvso.height
    var base_index = 0
    var max_scale_rate = 0
    var zero_num = 0
    for (var i = 0; i < 4; i++) {
      var rate = 0
      if (i % 2) {
        rate = dims[i] / ow
      } else {
        rate = dims[i] / oh
      }
      if (rate > max_scale_rate) {
        base_index = i
        max_scale_rate = rate
      }
      if (dims[i] == 0) {
        zero_num++
      }
    }
    if (zero_num > 1) { return }
    //
    var step = 2
    var cover_step = step * 5
    //
    var ctxo = this.ctxo
    var ctxt = this.ctxt
    ctxt.clearRect(0, 0, ctxt.canvas.width, ctxt.canvas.height)
    if (base_index % 2 == 0) {
      var ctxl = this.create_canvas_context(ow, cover_step)
      ctxl.globalCompositeOperation = "copy"
      var cvsl = ctxl.canvas
      for (var y = 0; y < oh; y += step) {
        var r = y / oh
        var sx = d0x + (d3x - d0x) * r
        var sy = d0y + (d3y - d0y) * r
        var ex = d1x + (d2x - d1x) * r
        var ey = d1y + (d2y - d1y) * r
        var ag = Math.atan((ey - sy) / (ex - sx))
        var sc = Math.sqrt(Math.pow(ex - sx, 2) + Math.pow(ey - sy, 2)) / ow
        ctxl.setTransform(1, 0, 0, 1, 0, -y)
        ctxl.drawImage(ctxo.canvas, 0, 0)
        //
        ctxt.translate(sx, sy)
        ctxt.rotate(ag)
        ctxt.scale(sc, sc)
        ctxt.drawImage(cvsl, 0, 0)
        //
        ctxt.setTransform(1, 0, 0, 1, 0, 0)
      }
    } else if (base_index % 2 == 1) {
      var ctxl = this.create_canvas_context(cover_step, oh)
      ctxl.globalCompositeOperation = "copy"
      var cvsl = ctxl.canvas
      for (var x = 0; x < ow; x += step) {
        var r = x / ow
        var sx = d0x + (d1x - d0x) * r
        var sy = d0y + (d1y - d0y) * r
        var ex = d3x + (d2x - d3x) * r
        var ey = d3y + (d2y - d3y) * r
        var ag = Math.atan((sx - ex) / (ey - sy))
        var sc = Math.sqrt(Math.pow(ex - sx, 2) + Math.pow(ey - sy, 2)) / oh
        ctxl.setTransform(1, 0, 0, 1, -x, 0)
        ctxl.drawImage(ctxo.canvas, 0, 0)
        ctxt.translate(sx, sy)
        ctxt.rotate(ag)
        ctxt.scale(sc, sc)
        ctxt.drawImage(cvsl, 0, 0)
        ctxt.setTransform(1, 0, 0, 1, 0, 0)
      }
    }
    // this.ctxd.scale(0.4, 0.4)
    // this.ctxd.save()
    this.ctxd.imageSmoothingEnabled = true
    if (this.bgColor) {
      this.drawColor()
    }
    this.ctxd.drawImage(this.bgImage, 0, 0)
    this.ctxd.drawImage(ctxt.canvas, 0, 0)
    // this._applyMask(this.ctxd, [[d0x, d0y], [d1x, d1y], [d2x, d2y], [d3x, d3y]])
    // this.ctxd.restore()
  }

  drawColor() {
    this.ctxd.beginPath();
    this.ctxd.rect(0, 0, this.bgImage.width, this.bgImage.height);
    this.ctxd.fillStyle = this.bgColor
    this.ctxd.fill();
  }


  create_canvas_context(w, h) {
    var canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    var ctx = canvas.getContext('2d')
    return ctx
  }

  _applyMask(ctx, points) {
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    for (var i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1])
    }
    ctx.closePath()
    ctx.globalCompositeOperation = "destination-in"
    ctx.fill()
    ctx.globalCompositeOperation = "source-over"
  }
}

export default PerspectiveTransform