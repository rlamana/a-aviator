 AFRAME.registerShader('phong', {
  schema: {
    color: { type: 'color' },
    shading: { default: 'smooth' },
    opacity: { default: 1.0 }
  },

  init: function (data) {
    this.textureSrc = null;
    this.material = new THREE.MeshPhongMaterial(this._getMaterialData(data));
    return this.material;
  },

  update: function (data) {
    this.updateMaterial(data);
    return this.material;
  },

  updateMaterial: function (data) {
    var material = this.material;
    data = this._getMaterialData(data);
    Object.keys(data).forEach(function (key) {
      material[key] = data[key];
    });
  },

  _getMaterialData: function (data) {
    return {
      color: new THREE.Color(data.color),
      opacity: data.opacity,
      shading: data.shading === 'flat' ? THREE.FlatShading : THREE.SmoothShading
    };
  }
});