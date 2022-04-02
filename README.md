# Academy Frontend

### Dependencies
Install SCSS with `npm install -g sass`. All other dependencies are in `package.json` and may be installed with `npm install`.
Requires Node version 16.

### Scripts
- `build` Completely refreshes the TypeScript dist folder. Slower but forces old files to be removed.
- `start` Starts the server in development mode.
- `watch` Starts the server and watches for changes in development mode.
- `scss` Watches for changes to the SCSS files.
- `prettier` Cleans and lints code.

### Production
Install PM2 with `npm install pm2 -g` and run using `pm2 start ./dist/index.js --name NAME`.
