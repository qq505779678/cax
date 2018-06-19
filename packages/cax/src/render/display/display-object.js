import Matrix2D from '../base/matrix2d.js'
import EventDispatcher from '../base/event-dispatcher'
import UID from '../base/uid.js'

class DisplayObject extends EventDispatcher {
  constructor () {
    super()
    this.alpha = this.complexAlpha = this.scaleX = this.scaleY = 1
    this.x = this.y = this.rotation = this.skewX = this.skewY = this.originX = this.originY = 0
    this.cursor = null
    this.visible = true
    this._matrix = new Matrix2D()
    this._hitMatrix = new Matrix2D()
    this.id = UID.get()
  }

  isVisible () {
    return this.visible && this.alpha > 0 && this.scaleX !== 0 && this.scaleY !== 0
  }

  initAABB () {
    if (this.width === undefined || this.height === undefined) {
      return
    }

    let x,
      y,
      width = this.width,
      height = this.height,
      mtx = this._matrix,
      xA = width * mtx.a,
      xB = width * mtx.b,
      yC = height * mtx.c,
      yD = height * mtx.d,
      tx = mtx.tx,
      ty = mtx.ty,
      minX = tx,
      maxX = tx,
      minY = ty,
      maxY = ty

    if ((x = xA + tx) < minX) {
      minX = x
    } else if (x > maxX) {
      maxX = x
    }
    if ((x = xA + yC + tx) < minX) {
      minX = x
    } else if (x > maxX) {
      maxX = x
    }
    if ((x = yC + tx) < minX) {
      minX = x
    } else if (x > maxX) {
      maxX = x
    }
    if ((y = xB + ty) < minY) {
      minY = y
    } else if (y > maxY) {
      maxY = y
    }
    if ((y = xB + yD + ty) < minY) {
      minY = y
    } else if (y > maxY) {
      maxY = y
    }
    if ((y = yD + ty) < minY) {
      minY = y
    } else if (y > maxY) {
      maxY = y
    }
    this.AABB = [minX, minY, maxX - minX, maxY - minY]
    this.rectPoints = [{
      x: tx,
      y: ty
    }, {
      x: xA + tx,
      y: xB + ty
    }, {
      x: xA + yC + tx,
      y: xB + yD + ty
    }, {
      x: yC + tx,
      y: yD + ty
    }]
  }

  destroy () {
    this.parent.remove(this)
  }

  hover (over, out, move) {
    this.on('mouseover', over)
    this.on('mouseout', out)
    move && this.on('mousemove', move)
  }
}

export default DisplayObject