import { md5 } from './md5'
import dayjs from './dayjs'

const utils = {
  md5,
  dayjs,
}

export default {
  install(app) {
    app.config.globalProperties.$utils = utils
  },
}
