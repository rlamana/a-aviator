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
 * Modifies the geometry of the entity to generate waves.
 */
AFRAME.registerComponent('waves', {
  dependencies: ['geometry'],

  update() {
    const mesh = this.el.getOrCreateObject3D('mesh', THREE.Mesh);
    mesh.geometry.mergeVertices();

    // Create an array to store new data associated to each vertex.
    this.waves = [];

    for (const v of mesh.geometry.vertices) {
      // Store some data associated to it.
      this.waves.push({
        x: v.x,
        y: v.y,
        z: v.z,
        ang: Math.random() * Math.PI * 2, // A random angle.
        amp: 5 + Math.random() * 20, // A random distance.
        speed: 0.0116 + Math.random() * 0.032 // A random speed between 
                                              // 0.016 and 0.048 radians / frame.
      });
    };
  },

  tick(time, timeDelta) {
    const mesh = this.el.getOrCreateObject3D('mesh', THREE.Mesh);

    for (let i = 0; i < mesh.geometry.vertices.length; i++){
      const v = mesh.geometry.vertices[i]; // Get the data associated to it.
      const vprops = this.waves[i];
      
      // Update the position of the vertex.
      v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
      v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;

      // Increment the angle for the next frame.
      vprops.ang += vprops.speed;
    }

    // Tell the renderer that the geometry of the sea has changed.
    // In fact, in order to maintain the best level of performance, 
    // three.js caches the geometries and ignores any changes
    // unless we add this line.
    mesh.geometry.verticesNeedUpdate = true;
    mesh.rotation.y -= .0005 * timeDelta;
  }
});