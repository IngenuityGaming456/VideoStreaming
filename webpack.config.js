module.exports = {
    entry: "./src/main.ts",
    output: {
        path: __dirname,
        filename: "public/main.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "awesome-typescript-loader",
            }    
        ]
    }
};