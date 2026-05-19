const fs = require('fs');
let f = fs.existsSync('www/index_wordpdf_upgrade.html') ? 'www/index_wordpdf_upgrade.html' : 'index_wordpdf_upgrade.html';
let h = fs.readFileSync(f, 'utf8');
let n = `function dlBlob(blob,name){ 
  if(window.Capacitor){ 
    var r = new FileReader(); 
    r.readAsDataURL(blob); 
    r.onloadend = function(){ 
      var fsP = window.Capacitor.Plugins.Filesystem || window.capacitorFilesystem;
      if(fsP){
        fsP.writeFile({path: name, data: r.result.split(',')[1], directory: 'DOCUMENTS'})
          .then(()=>alert(name + " सफलतापूर्वक सेव हो गई!"))
          .catch(e=>alert("Error: " + e.message));
      } else {
        alert("Filesystem Plugin missing");
      }
    } 
  } else { 
    const u=URL.createObjectURL(blob); 
    const a=document.createElement('a'); 
    a.href=u; a.download=name; document.body.appendChild(a); a.click(); 
  } 
}`;
h = h.replace(/function dlBlob\(blob,name\)\{[\s\S]*?setTimeout\(\(\)=>\{URL\.revokeObjectURL\(u\);a\.remove\(\);\},1000\);\s*\}/, n);
fs.writeFileSync(f, h);
console.log('✅ Download Code Fixed!');
