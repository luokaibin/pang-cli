const fs = require('fs');
const path = require('path');

module.exports = {
  entry: 'src',
  ignoreDir: [
    'src/utils/language',
    'src/utils/offlineData',
    'src/components/Charts',
    'src/pages/demo',
    'src/pages/test',
    'src/data',
  ],
  ignoreFile: [
    'src/utils/i18n.js',
    'src/utils/getPageHeader.js',
    'src/lib/scripts/seo_404.js',
  ],
  name: 'kiki-web',
  down: 'http://192.168.20.159:10088/api/down',
  report: 'http://192.168.20.159:10088/api/report',
  checkApi: 'http://192.168.20.159:10088/api/updateWords',
  initCheckInfoMap: {
    layout_safety_relate: new Set(['src/components/Navbar/const.js']),
    layout_othersetting: new Set(['src/components/Navbar/const.js']),
    layout_mybusiness: new Set(['src/components/Navbar/const.js']),
    auth: new Set(['src/components/Navbar/const.js']),
    home_invite_friends: new Set(['src/components/Navbar/const.js']),
    user_contact_us: new Set(['src/components/Navbar/const.js']),
    P1m: new Set(['src/widget/trade/KLine/index.js']),
    P5m: new Set(['src/widget/trade/KLine/index.js']),
    P15m: new Set(['src/widget/trade/KLine/index.js']),
    P30m: new Set(['src/widget/trade/KLine/index.js']),
    P1h: new Set(['src/widget/trade/KLine/index.js']),
    P4h: new Set(['src/widget/trade/KLine/index.js']),
    P1d: new Set(['src/widget/trade/KLine/index.js']),
    P1w: new Set(['src/widget/trade/KLine/index.js']),
    P1M: new Set(['src/widget/trade/KLine/index.js']),
    P1y: new Set(['src/widget/trade/KLine/index.js']),
    subscribe: new Set([
      'src/widget/wallet/history/finance/RegularBasisTab/const.js',
    ]),
    position: new Set([
      'src/widget/wallet/history/finance/RegularBasisTab/const.js',
    ]),
    interestDistribution: new Set([
      'src/widget/wallet/history/finance/FlexibleSavingsList/const.js',
    ]),
    success: new Set([
      'src/widget/wallet/history/finance/FlexibleSavingsList/const.js',
    ]),
    processing: new Set([
      'src/widget/wallet/history/finance/FlexibleSavingsList/const.js',
    ]),
    purchaseFee1: new Set([
      'src/widget/wallet/history/finance/FlexibleSavingsList/const.js',
    ]),
    transferOutFee: new Set([
      'src/widget/wallet/history/finance/FlexibleSavingsList/const.js',
    ]),
    purchase: new Set([
      'src/widget/wallet/history/finance/FlexibleSavingsList/const.js',
    ]),
    redeem_done: new Set([
      'src/widget/wallet/history/finance/RegularBasisList/const.ts',
    ]),
  },
  rules: {
    js: ['flow', 'babel', 'tsx'],
    jsx: ['flow', 'babel', 'tsx'],
    ts: ['ts'],
    tsx: ['tsx'],
  },
  /**
   *
   * @param {Collection} ast ast 语法树
   * @returns importIi8n: boolean 是否导入了 Ii8n;
   * @returns importDefaultI18n: boolean 是否有 i18n 的默认导入;
   * @returns i18nName: string 导入的 i18n name;
   * @returns createImportFn: function 导入 Ii8n 的方法
   */
  handleImportAst(ast, j, filePath) {
    // 1. 先获取所有的 import 导入
    const imports = ast.find(j.ImportDeclaration);

    // 2. 在过滤出 utils/index 和 /i18n 的导入
    const i18nAst = imports?.filter((path) => {
      if (
        path.value.source?.value?.includes('/i18n') ||
        path.value.source?.value?.includes('@utils/index')
      ) {
        return true;
      }
      return false;
    });
    let i18nName = 'I18n';
    let createImportFn;
    // 代码里没有 import 语句
    if (!imports.__paths.length) {
      i18nName = 'I18n';
      createImportFn = () => {
        const body = ast.find(j.Program).__paths[0]?.value?.body;
        if (body) {
          const i18nImport = j("import { I18n } from '@utils/index';\n").find(
            j.ImportDeclaration
          ).__paths[0].value;
          body.unshift(i18nImport);
        }
      };
      return { i18nName, createImportFn };
    }
    // 代码里既没有 import /i18n 也没有 import utils/index
    if (!i18nAst.__paths.length) {
      // 没有导入 i18n 的，直接导入 i18n
      // 判断条件 i18nDefaultAst.__paths.length 不存在 && i18nAst.__paths.length 不存在
      i18nName = 'I18n';
      createImportFn = () => {
        const firstImport = imports.__paths[0];
        const i18nImport = j("import { I18n } from '@utils/index';\n").find(
          j.ImportDeclaration
        ).__paths[0].value;
        firstImport.insertAfter(i18nImport);
      };
    }
    // 从所有 i18n 和 utils 的导入里 过滤出 存在 default 导入的
    // 因为 utils 并没有 default 导入，所以过滤出的 default 只会是 i18n的
    const i18nDefaultAst = i18nAst.filter((path) => {
      return path.value.specifiers?.some(
        (item) => item.type === 'ImportDefaultSpecifier'
      );
    });
    if (i18nDefaultAst.__paths.length) {
      const defaultName = i18nDefaultAst.find(j.ImportDefaultSpecifier)
        .__paths[0].value.local.name;
      i18nName = defaultName;
      return { i18nName, createImportFn };
    }

    // 没有 default 导入，说明用户没有从 i18n.js 内导入 i18n 或者用户直接就没有导入 i18n
    // 此时找到 utils 的导入语句，往内插入 I18n
    const utilsAst = i18nAst.filter((path) => {
      return path.value.source?.value?.includes('@utils/index');
    });
    if (!utilsAst.__paths.length) {
      i18nName = 'I18n';
      createImportFn = () => {
        const firstImport = imports.__paths[0];
        const i18nImport = j("import { I18n } from '@utils/index';\n").find(
          j.ImportDeclaration
        ).__paths[0].value;
        firstImport.insertAfter(i18nImport);
      };
      return { i18nName, createImportFn };
    }
    // 导入了 utils/index 在判断有没有导入 I18n
    const i18nImportAst = utilsAst.filter((path) => {
      return path.value.specifiers?.some(
        (item) => item.imported.name === 'I18n'
      );
    });

    if (i18nImportAst.__paths.length) {
      i18nImportAst.find(j.ImportSpecifier).__paths.forEach((path) => {
        if (path.value.imported.name === 'I18n') {
          i18nName = path.value.local.name;
        }
      });
      return { i18nName, createImportFn };
    }

    i18nName = 'I18n';

    createImportFn = () => {
      const specifiers = utilsAst.__paths[0].value.specifiers;
      specifiers.unshift(
        j.importSpecifier({
          type: 'Identifier',
          name: 'I18n',
        })
      );
    };
    return { i18nName, createImportFn };
  },
  outputFile(data) {
    // msgKey 不需要进行输出
    const langPkg = data.filter((item) => !item?.tags?.includes('msgKey'));
    const { zh, hk, en } = langPkg.reduce(
      (prev, curr) => {
        prev.zh[curr.key] = curr.zhCN;
        prev.hk[curr.key] = curr.zhTC ?? curr.zhCN;
        prev.en[curr.key] = curr.en ?? curr.zhCN;
        return prev;
      },
      { zh: {}, hk: {}, en: {} }
    );
    fs.writeFileSync(
      path.resolve(__dirname, 'src/utils/language/zh.json'),
      JSON.stringify(zh, null, 2)
    );
    fs.writeFileSync(
      path.resolve(__dirname, 'src/utils/language/hk.json'),
      JSON.stringify(hk, null, 2)
    );
    fs.writeFileSync(
      path.resolve(__dirname, 'src/utils/language/en.json'),
      JSON.stringify(en, null, 2)
    );
  },
};
