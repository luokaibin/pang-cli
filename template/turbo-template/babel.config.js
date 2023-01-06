module.exports = function override(api) {
  // const env = api.cache(() => process.env.NODE_ENV);
  // console.log(api)
  const isProd = api.cache(() => process.env.NODE_ENV === 'production');
  // console.log('isProd :' + isProd)
  const isServer = api.caller((caller) => caller?.isServer)
  const isCallerDevelopment = api.caller((caller) => caller?.isDev)

  if (!isProd) {
    return {
      presets: [
        'next/babel',
        ['@babel/preset-react', {
          importSource: '@welldone-software/why-did-you-render',
          runtime: 'automatic'
        }]

      ],
      plugins: [
        // 'transform-flow-strip-types',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: false }]
      ]
    };
  } else {
    return {
      presets: ['next/babel'],
      plugins: [
        ['react-native-web', { commonjs: true }],
        // 'transform-flow-strip-types',
        'transform-remove-console',
        ['@babel/plugin-proposal-decorators', { legacy: true }], // 处理装饰器
        ['@babel/plugin-proposal-class-properties', { loose: false }] // 编译类的

      ]
    };
  }
};
