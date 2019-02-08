const presets = [
  [
    "@babel/env",
    {
      targets: {
        node: true,
      },
    },
  ],
]

const plugins = ["@babel/proposal-export-default-from"]

module.exports = {
  presets,
  plugins,
}
