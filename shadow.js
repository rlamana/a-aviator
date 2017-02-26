
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
 * Sets object's castShadow and receiveShadow properties.
 * Works on entities with 'geometry' and/or 'light' components.
 */
AFRAME.registerComponent('shadow', {
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
    const data = this.data;
    if (this.el.hasAttribute('light')) {
      const light = this.el.getObject3D('light');
      light.shadow.camera.left    = data['cameraLeft'] || -400;
      light.shadow.camera.right   = data['cameraRight'] || 400;
      light.shadow.camera.top     = data['cameraTop'] || 400;
      light.shadow.camera.bottom  = data['cameraBottom'] || -400;
      light.shadow.camera.near    = data['cameraNear'] || 1;
      light.shadow.camera.far     = data['cameraFar'] || 1000;
      light.shadow.mapSize.width  = data['mapWidth'] || 2048;
      light.shadow.mapSize.height = data['mapHeight'] || 2048;
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
