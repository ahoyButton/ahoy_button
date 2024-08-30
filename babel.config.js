module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    [
      "@nutui/babel-plugin-separate-import",
      {
        "libraryName": "@nutui/nutui",
        "libraryDirectory": "dist/packages",
        "style": "scss"
      }
    ]
  ]
}
