import SparkMD5 from 'spark-md5'

/**
 * MD5 Ecryption
 * @param {string} str - Content to accept
 * @returns {string} - Content to encrypt
 */
export function md5(str) {
  return SparkMD5.hash(str)
}
