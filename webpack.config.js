const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.jsx"
    },
    mode: "production",
    module: {
        rules: [
            {
              test: /\.jsx?$/,  // Updated to handle .js and .jsx files
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",  // Using Babel to transpile JS and JSX
                options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"]
                }
              }
            },
            {
              test: /\.css$/i,
              exclude: /node_modules/,
              use: [
                  "style-loader",
                  "css-loader"
              ]
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "../manifest.json" },
            ],
        }),
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".js", ".jsx"],  // Updated to include .js and .jsx
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
