const fs = require('fs');
let config = JSON.parse(fs.readFileSync('capacitor.config.json', 'utf8'));
config.server = {
  "url": "https://pdfusion.edgeone.app",
  "cleartext": true
};
fs.writeFileSync('capacitor.config.json', JSON.stringify(config, null, 2));
