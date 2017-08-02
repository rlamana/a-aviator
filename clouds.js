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
 * Random creation of clouds in the sky.
 */
AFRAME.registerComponent('clouds', {
  _createCloud() {
    // Create an empty container that will hold the different parts of the cloud.
    const mesh = new THREE.Object3D();
    
    // Create a cube geometry;
    // This shape will be duplicated to create the cloud.
    const geom = new THREE.BoxGeometry(20,20,20);
    
    // Create a material; a simple white material will do the trick.
    const mat = new THREE.MeshStandardMaterial({
      color: '#ffffff',  
    });
    
    // Duplicate the geometry a random number of times.
    const nBlocs = 3+Math.floor(Math.random()*3);
    for (let i=0; i<nBlocs; i++) {
      // Create the mesh by cloning the geometry.
      const m = new THREE.Mesh(geom, mat); 
      
      // Set the position and the rotation of each cube randomly.
      m.position.x = i*15;
      m.position.y = Math.random()*10;
      m.position.z = Math.random()*10;
      m.rotation.z = Math.random()*Math.PI*2;
      m.rotation.y = Math.random()*Math.PI*2;
      
      // Set the size of the cube randomly.
      const s = .1 + Math.random()*.9;
      m.scale.set(s,s,s);
      
      // Allow each cube to cast and to receive shadows.
      m.castShadow = true;
      m.receiveShadow = true;
      
      // Add the cube to the container we first created.
      mesh.add(m);
    } 
    return mesh;
  },

  update() {
    const mesh = this.el.getOrCreateObject3D('mesh', THREE.Mesh);
    const geometry = mesh.geometry = new THREE.BoxGeometry(20,20,20);
    
    // Choose a number of clouds to be scattered in the sky.
    this.nClouds = 20;
    
    // To distribute the clouds consistently,
    // we need to place them according to a uniform angle.
    const stepAngle = Math.PI*2 / this.nClouds;
    
    // Create the clouds.
    for(let i=0; i<this.nClouds; i++){
      const c = this._createCloud();
      
      // Set the rotation and the position of each cloud for that we use a bit of trigonometry.
      const a = stepAngle*i; // This is the final angle of the cloud.
      const h = 750 + Math.random()*200; // This is the distance between the center of the axis and the cloud itself.

      // Trigonometry!!! I hope you remember what you've learned in Math :)
      // in case you don't: 
      // We are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y).
      c.position.y = Math.sin(a)*h;
      c.position.x = Math.cos(a)*h;

      // Rotate the cloud according to its position.
      c.rotation.z = a + Math.PI/2;

      // For a better result, we position the clouds at random depths inside of the scene.
      c.position.z = -400-Math.random()*400;
      
      // We also set a random scale for each cloud.
      let s = 1+Math.random()*2;
      c.scale.set(s,s,s);

      // Do not forget to add the mesh of each cloud in the scene.
      mesh.add(c);  
    }
    geometry.computeBoundingSphere();
  },

  remove() {
    this.el.getObject3D('mesh').geometry = new THREE.Geometry();
  },

  tick(time, timeDelta) {
    // Rotate clouds.
    const object3D = this.el.object3D;
    object3D.rotateZ(.0005 * timeDelta);
  }
});