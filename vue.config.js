module.exports = {
    pluginOptions: {
      electronBuilder: {
        builderOptions: {
            extraResources: [
                "src/preload.js"
            ]
        },
      }
    }
  }