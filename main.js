// Extract all parameters and output in ffuf compatible format
(() => {
  const results = new Set();

  // Extract from url
  new URLSearchParams(window.location.search).forEach((_, key) => {
    results.add(key);
  });

  // Extract from url Cookies
  document.cookie.split(';').forEach(cookie => {
    const key = cookie.split('=')[0].trim();
    results.add(key);
  });

  // Extract from url LocalStorage keys
  Object.keys(localStorage).forEach(key => {
    results.add(key);
  });

  // Extract from url SessionStorage keys
  Object.keys(sessionStorage).forEach(key => {
    results.add(key);
  });

  // Extract from url Meta tags (name/property)
  document.querySelectorAll('meta[name], meta[property]').forEach(meta => {
    const key = meta.getAttribute('name') || meta.getAttribute('property');
    results.add(key);
  });

  // Extract from url Data attributes (all elements)
  document.querySelectorAll('*').forEach(el => {
    [...el.attributes].forEach(attr => {
      if (attr.name.startsWith('data-')) {
        results.add(attr.name);
      }
    });
  });

  // Extract from url Form input names
  document.querySelectorAll('input[name], select[name], textarea[name]').forEach(el => {
    results.add(el.name);
  });

  // Output one parameter per line
  console.log([...results].join('\n'));
  // Downloading Result
  const blob = new Blob([[...results].join('\n')], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'parameters_wordlist.txt';
  a.click();
})();
