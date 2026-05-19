window.addEventListener('load', function() {
  document.addEventListener('click', function(e) {
    let target = e.target.closest('a');
    if (target && (target.href.endsWith('.pdf') || target.href.endsWith('.pptx') || target.href.endsWith('.zip'))) {
      e.preventDefault();
      let fileName = target.href.split('/').pop();
      
      // यह हिस्सा ऐप के अंदर नेटिव डाउनलोड ट्रिगर करेगा
      if (typeof Capacitor !== 'undefined') {
        fetch(target.href)
          .then(res => res.blob())
          .then(blob => {
            let reader = new FileReader();
            reader.onload = function() {
              Capacitor.Plugins.Filesystem.writeFile({
                path: fileName,
                data: reader.result,
                directory: "DOCUMENTS"
              }).then(() => alert("File downloaded to Documents!"));
            };
            reader.readAsDataURL(blob);
          });
      } else {
        window.location.href = target.href;
      }
    }
  });
});
