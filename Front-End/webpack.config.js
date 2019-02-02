const path = require("path");

module.exports = {
    entry: ["./client/src/index.js"],
    output: {
        path: path.resolve(__dirname, "client"),
        filename: "main.js"
    },
    // How to process project files with loaders
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    mode: "development"
};
