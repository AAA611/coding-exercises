class MyWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('MyWebpackPlugin', compilation => {
      const assets = compilation.assets
      Object.keys(assets).forEach(filename => {
        if (filename.endsWith('.js')) {
          let source = assets[filename].source()
          const comment = '// Hello World!'
          source = comment + source
          assets[filename] = {
            source: () => source,
            size: () => source.length
          }
        }
      })
    })
  }
}