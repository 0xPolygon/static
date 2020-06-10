var fs = require('fs');
var files = fs.readdirSync('network');

const networks = ['mainnet', 'testnet']
networks.forEach(n => {
  const versions = fs.readdirSync(`network/${n}`)
  versions.forEach(v => {
    const artifacts = fs.readdirSync(`network/${n}/${v}/artifacts`)
    artifacts.forEach(a => {
      const name = `network/${n}/${v}/artifacts/${a}`
      const abi = JSON.parse(fs.readFileSync(name)).abi
      if (!abi.length) {
        fs.unlinkSync(name)
      } else {
        fs.writeFileSync(name, JSON.stringify({ abi }) + '\n')
      }
    })
  })
})
