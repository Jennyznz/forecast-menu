import path from "path";
import { fileURLToPath } from "url";
// import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from 'dotenv-webpack';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development",
  entry: "./src/client/index.js", // Updated to match src/client structure
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new Dotenv()
  ],
  module: {
    rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
    ],
  },
};