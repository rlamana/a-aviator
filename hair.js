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
 * Cool animated hair as conceived by Karim Maaloul.
 */
AFRAME.registerComponent('hair', {
  init() {
    this._angleHairs = 0;
    this._hairsTop = null;
  },

  update() {
    const mesh = this.el.getOrCreateObject3D('mesh', THREE.Mesh);
    const hairGeom = new THREE.BoxGeometry(5, 5, 5);
    const hair = new THREE.Mesh(hairGeom, mesh.material);

    // Align the shape of the hair to its bottom boundary, that will make it easier to scale.
    hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,2,0));
    
    // Create a container for the hair.
    const hairs = new THREE.Object3D();

    // Create a container for the hairs at the top of the head (the ones that
    // will be animated).
    this._hairsTop = new THREE.Object3D();

    // Create the hairs at the top of the head and position them on a 3 x 4 grid.
    for (let i = 0; i < 12; i++) {
      const h = hair.clone();
      const col = i % 3;
      const row = Math.floor(i / 3);
      const startPosZ = -4;
      const startPosX = -4;
      h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
      this._hairsTop.add(h);
    }
    hairs.add(this._hairsTop);

    // Create the hairs at the side of the face.
    const hairSideGeom = new THREE.BoxGeometry(12, 4, 2);
    hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6, 0, 0));
    const hairSideR = new THREE.Mesh(hairSideGeom, mesh.material);
    const hairSideL = hairSideR.clone();
    hairSideR.position.set(8, -2, 6);
    hairSideL.position.set(8, -2, -6);
    hairs.add(hairSideR);
    hairs.add(hairSideL);

    // Create the hairs at the back of the head.
    var hairBackGeom = new THREE.BoxGeometry(2, 8, 10);
    var hairBack = new THREE.Mesh(hairBackGeom, mesh.material);
    hairBack.position.set(-1, -4 ,0)
    hairs.add(hairBack);
    hairs.position.set(-5, 5, 0);

    mesh.add(hairs);
  },

  tick(time, timeDelta) {
    this._updateHairs(timeDelta);
  },

  _updateHairs(timeDelta) {
    // Get the hair.
    const hairs = this._hairsTop.children;

    // Update them according to the angle angleHairs.
    for (let i = 0; i < hairs.length; i++) {
      const h = hairs[i];
      // Each hair element will scale on cyclical basis between 75% and 100% of 
      // its original size.
      h.scale.y = .75 + Math.cos(this._angleHairs + i / 3) * .25;
    }
    // Increment the angle for the next frame.
    this._angleHairs += timeDelta * .010;
  }
});