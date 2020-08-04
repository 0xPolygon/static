var fs = require('fs');
var files = fs.readdirSync('network');

const networks = ['mainnet', 'testnet']
networks.forEach(n => {
  const versions = fs.readdirSync(`network/${n}`)
  versions.filter(v => v !== '.DS_Store').forEach(v => {
    const types = fs.readdirSync(`network/${n}/${v}/artifacts`)
    types.filter(t => t !== '.DS_Store').forEach(t => {
      const artifacts = fs.readdirSync(`network/${n}/${v}/artifacts/${t}`)
      artifacts.filter(a => a !== '.DS_Store').forEach(a => {
        const name = `network/${n}/${v}/artifacts/${t}/${a}`
        const abi = JSON.parse(fs.readFileSync(name)).abi
        if (!abi.length) {
          fs.unlinkSync(name)
        } else {
          fs.writeFileSync(name, JSON.stringify({ abi }) + '\n')
        }
      })
    })
  })
})
