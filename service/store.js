const PREFIX = "INT_"
const Store = {
  set: function(key, value) {
    const internalKey = PREFIX + key
    this[internalKey] = value
    console.log(`store saved ${key} = ${value}`)
  },
  get(key) {
    const internalKey = PREFIX + key
    try {
      return this[internalKey]
    } catch (e) {
      return null
    }
  }



}

module.exports = Store
