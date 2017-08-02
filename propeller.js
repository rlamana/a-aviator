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
 * Modifies propeller geometry and animates the component.
 */
AFRAME.registerComponent('propeller', {
  dependencies: ['geometry'],

  update() {
    const mesh = this.el.getOrCreateObject3D('mesh', THREE.Mesh);
    mesh.geometry.vertices[4].y -= 5;
    mesh.geometry.vertices[4].z += 5;
    mesh.geometry.vertices[5].y -= 5;
    mesh.geometry.vertices[5].z -= 5;
    mesh.geometry.vertices[6].y += 5;
    mesh.geometry.vertices[6].z += 5;
    mesh.geometry.vertices[7].y += 5;
    mesh.geometry.vertices[7].z -= 5;
  },

  tick(time, timeDelta) {
    // Rotate propeller and blades.
    const object3D = this.el.object3D;
    object3D.rotateX(.20 * timeDelta * 0.1);
  }
});