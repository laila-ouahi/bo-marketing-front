const { override, fixBabelImports, addLessLoader } = require('customize-cra')

// Less variables: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@font-size-base': '13px',
            '@font-family': 'Muli, sans-serif',
            '@font-size-sm': '10px',
            '@primary-color': '#008991',
            '@link-color': '#009998',
            '@layout-body-background': '#f7f8f9',
            '@layout-header-background': '#ffffff',
            '@layout-sider-background': '#ffffff',
            '@menu-item-font-size': '13px',
            '@menu-inline-toplevel-item-height': '50px',
            '@menu-item-height': '40px',
            '@menu-collapsed-width': '80px',
            '@menu-item-active-bg': '#e0e0e0',

            '@menu-item-color': '#000000',
            '@menu-item-active-border-width': '0',
            '@menu-item-group-title-color': '#000000',
            '@menu-dark-selected-item-icon-color': '#000000',
            '@menu-dark-selected-item-text-color': '#000000'
        }
    })
)
