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
 * Modifies cockpit of the plane to look cooler.
 */
AFRAME.registerComponent('cockpit', {
  dependencies: ['geometry'],

  schema: {
    type: 'string',
    default: 'normal'
  },

  update() {
    const mesh = this.el.getOrCreateObject3D('mesh', THREE.Mesh);
    if (this.data === 'cool') {
      mesh.geometry.vertices[4].y -= 10;
      mesh.geometry.vertices[4].z += 20;
      mesh.geometry.vertices[5].y -= 10;
      mesh.geometry.vertices[5].z -= 20;
      mesh.geometry.vertices[6].y += 30;
      mesh.geometry.vertices[6].z += 20;
      mesh.geometry.vertices[7].y += 30;
      mesh.geometry.vertices[7].z -= 20;
    }
  }
});