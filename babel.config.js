/*
 * @Description:
 * @Date: 2020-04-27 15:08:09
 * @LastEditTime: 2020-05-22 17:55:12
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ]
  ]
}
