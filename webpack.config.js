// const path = require('path');

// module.exports = {
//   entry: './src/index.js', // Entry point for the application
//   output: {
//     path: path.resolve(__dirname, 'dist'), // Output directory for the bundled files
//     filename: 'bundle.js' // Output file name
//   },
//   module: {
//     rules: [
//       {
//         test: /\.m?js$/, // Test for JavaScript and ECMAScript modules
//         exclude: /(node_modules|bower_components)/, // Exclude these directories
//         use: {
//           loader: 'babel-loader', // Use Babel loader to transpile the code
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'] // Babel presets for modern JavaScript and React
//           }
//         }
//       }
//     ]
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'] 
//   },
//   devServer: {
//     static: path.join(__dirname, 'public'), 
//     compress: true, 
//     port: 9000, 
//     setupMiddlewares: (middlewares, devServer) => {
//       // Add a custom route
//       devServer.app.get('/api/custom-route', (req, res) => {
//         res.json({ custom: 'response' }); 
//       });

//       return middlewares; 
//     }
//   }
// };
