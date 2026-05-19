const fs = require('fs');
const file = 'www/index_wordpdf_upgrade.html';

if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const injection = `
<script>
window.addEventListener("message", function(e) {
  if (e.data && e.data.type === "DOWNLOAD") {
    Capacitor.Plugins.Filesystem.writeFile({
      path: e.data.fileName,
      data: e.data.blobData,
      directory: "DOCUMENTS"
    }).then(() => alert("Saved to Documents!"));
  }
});
</script>
</body>`;
    content = content.replace('</body>', injection);
    fs.writeFileSync(file, content);
    console.log("✅ Download bridge injected successfully!");
} else {
    console.log("❌ File not found!");
}
