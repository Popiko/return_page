import AV from 'leancloud-storage'
class Leancloud {
  constructor() {
    this.APP_ID = 'XTXmL45PrWgoUdGbckIII4qB-gzGzoHsz'
    this.APP_KEY = 'LqfjlXMGXe9m2C0CjTIWcm6g'
    this.SERVER_URL = 'https://xtxml45p.lc-cn-n1-shared.com'
  }

  init() {
    AV.init({
      appId: this.APP_ID,
      appKey: this.APP_KEY,
      serverURL: this.SERVER_URL
    })
  }
}
const leancloud = new Leancloud()
export default leancloud
