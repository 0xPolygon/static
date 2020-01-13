class Network {
  constructor(name, version = "v1") {
    this.name = name
    this.version = version

    const info = require(`./${this.name}/${this.version}/index.json`)
    // treat data as properties
    Object.keys(info).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: false,
        writable: false,
        value: info[key]
      })
    })
  }

  artifacts(name) {
    return require(`./${this.name}/${this.version}/artifacts/${name}.json`)
  }

  abi(name) {
    return this.artifacts(name).abi
  }
}

module.exports = Network
