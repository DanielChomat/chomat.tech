module.exports = {
  presets: [
    [
      "babel-preset-gatsby",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
}