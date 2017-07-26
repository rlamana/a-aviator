/*!
 * a-aviator <https://github.com/rlamana/a-aviator>
 *
 * Copyright (c) 2017, Ramon Lamana.
 * Based on Karim Maaloul's code for 'The Aviator': 
 *    <https://github.com/yakudoo/TheAviator>
 * 
 * Released under the MIT License.
 */

/**
 * Allows to control the entity where it is applied with the mouse.
 */
AFRAME.registerComponent('plane-controller', {
  init() {
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;  

    this._mouseInput = {
      position: {
        x: 0.0, 
        y: 0.0
      }
    };

    document.addEventListener('mousemove', (event) => {
      this._mouseInput.position = {
        // Here we are converting the mouse position value received to a normalized 
        // value letying between -1 and 1; this is the formula for the horizontal axis:
        x: -1 + (event.clientX / WIDTH) * 2,

        // For the vertical axis, we need to inverse the formula 
        // because the 2D y-axis goes the opposite direction of the 3D y-axis.
        y: 1 - (event.clientY / HEIGHT) * 2
      };
    }, false);
  },

  tick(time) {
    const targetY = this._normalize(this._mouseInput.position.y, -.75,.75,25, 175);
    const targetX = this._normalize(this._mouseInput.position.x, -.75,.75,-100, 100);

    const object3D = this.el.object3D;
    
    // Move the plane at each frame by adding a fraction of the remaining distance.
    object3D.position.y += (targetY - object3D.position.y) * 0.1;

    // Rotate the plane proportionally to the remaining distance.
    object3D.rotation.z = (targetY - object3D.position.y) * 0.0128;
    object3D.rotation.x = (object3D.position.y - targetY) * 0.0064;
  },

  _normalize: function (v, vmin, vmax, tmin, tmax){
    const nv = Math.max(Math.min(v,vmax), vmin);
    const dv = vmax - vmin;
    const pc = (nv - vmin) / dv;
    const dt = tmax - tmin;
    const tv = tmin + (pc * dt);
    return tv;
  }
});