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
 * Enables shadowMap in renderer.
 */
AFRAME.registerComponent('shadows', {
  schema: { default: true },

  init() {
    if (this.el.tagName === 'A-SCENE' && this.data) {
      this.el.renderer.shadowMap.enabled = true;
      this.el.renderer.antialias = true;
      this.el.renderer.alpha = true;
    }
  }
});

/**
 * Sets entities's castShadow and receiveShadow properties.
 * Works on entities with 'geometry' and/or 'light' components.
 */
AFRAME.registerComponent('cast-shadow', {
  dependencies: ['geometry'],

  schema: {
    cast:         { default: false },
    receive:      { default: false },
    cameraLeft:   { type: 'number' },
    cameraRight:  { type: 'number' },
    cameraTop:    { type: 'number' },
    cameraBottom: { type: 'number' },
    cameraNear:   { type: 'number' },
    cameraFar:    { type: 'number' },
    mapWidth:     { type: 'number' },
    mapHeight:    { type: 'number' }
  },

  update() {
    let object;
    if (this.el.hasAttribute('light')) {
      const light = this.el.getObject3D('light');
      light.shadow.camera.left    = this.data['cameraLeft'] || -400;
      light.shadow.camera.right   = this.data['cameraRight'] || 400;
      light.shadow.camera.top     = this.data['cameraTop'] || 400;
      light.shadow.camera.bottom  = this.data['cameraBottom'] || -400;
      light.shadow.camera.near    = this.data['cameraNear'] || 1;
      light.shadow.camera.far     = this.data['cameraFar'] || 1000;
      light.shadow.mapSize.width  = this.data['mapWidth'] || 2048;
      light.shadow.mapSize.height = this.data['mapHeight'] || 2048;
      object = light;
    } else if (this.el.hasAttribute('geometry')) {
      object = this.el.getOrCreateObject3D('mesh', THREE.Mesh);
    }

    if (object) {
      object.castShadow = this.data.cast;
      object.receiveShadow = this.data.receive;
    }
  }
});
