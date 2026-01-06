/**
 * @desc API配置生成器
 * @author maanpeng
 */
import { storage } from '@/utils/storage'
import { tokenFaildStatus, notNeedTokenUrl, downloadUrl } from '@/api/origin/check'

export default function (config, cover) {
  return function (_url) {
    if (cover) return config

    const token = storage.get('token')

    return {
      axiosConfig: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
      tokenFaildStatus,
      notNeedTokenUrl,
      downloadUrl,
      ...config,
    }
  }
}
