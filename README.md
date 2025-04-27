## 🔍 ParamSniffer - The Ultimate Web Parameter Extraction Tool
> ParamSniffer is a powerful yet lightweight JavaScript tool designed to extract all possible parameters from a web page with a single console command. It's perfect for security researchers, bug bounty hunters, penetration testers, and web developers who need to quickly gather parameters for fuzzing, testing, or debugging.

### 🌟 Key Features
📌 **Comprehensive Parameter Extraction**
ParamSniffer scans 7 different sources to collect every possible parameter, **including**:
- ✔ URL Query Parameters (?param=value)
- ✔ Cookies (All stored cookies)
- ✔ Web Storage (localStorage & sessionStorage keys)
- ✔ Meta Tags (<meta name="..."> and <meta property="...">)
- ✔ Data Attributes (data-* in HTML elements)
- ✔ Form Inputs `(<input>, <select>, <textarea> names)`

### 🚀 Optimized for Fuzzing & Automation
- **One parameter per line** → Directly usable with `ffuf`, `wfuzz`, `Burp Intruder`, etc.
- **No duplicates** → Clean output using JavaScript Set()
- **Zero dependencies** → Runs in any browser console

### 💾 Easy Export Options
- Copy-Paste from Console (Manual)
- Auto-Download as TXT File (Chrome/Edge)
- Programmatic Usage (Returns an array for scripting)

### 🛠 Use Cases
1. **Security Testing & Bug Bounty Hunting**
- Quickly gather parameters for fuzzing vulnerable endpoints.
- Discover hidden API parameters or undocumented inputs.
- Use with ffuf for automated parameter brute-forcing:

```
ffuf -w paramsniffer_wordlist.txt -u "https://example.com/api/FUZZ"
```

2. **Web Application Penetration Testing**
- Identify all possible input vectors for testing.
- Find sensitive data leaks in localStorage or cookies.

3. **Web Development & Debugging**
- Check what parameters a page is using.
- Debug hidden meta tags or data attributes.

### 📥 Installation & Usage
**✔ Run in Browser Console**
- Open DevTools (F12) → Console tab.
- Paste the script:
```
// Extract all parameters and output in ffuf compatible format
(() => {
  const results = new Set();

  // Extract from url
  new URLSearchParams(window.location.search).forEach((_, key) => {
    results.add(key);
  });

  // Extract from  Cookies
  document.cookie.split(';').forEach(cookie => {
    const key = cookie.split('=')[0].trim();
    results.add(key);
  });

  // Extract from  LocalStorage keys
  Object.keys(localStorage).forEach(key => {
    results.add(key);
  });

  // Extract from  SessionStorage keys
  Object.keys(sessionStorage).forEach(key => {
    results.add(key);
  });

  // Extract from  Meta tags (name/property)
  document.querySelectorAll('meta[name], meta[property]').forEach(meta => {
    const key = meta.getAttribute('name') || meta.getAttribute('property');
    results.add(key);
  });

  // Extract from Data attributes (all elements)
  document.querySelectorAll('*').forEach(el => {
    [...el.attributes].forEach(attr => {
      if (attr.name.startsWith('data-')) {
        results.add(attr.name);
      }
    });
  });

  // Extract from  Form input names
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
```
> All parameters will be shown and also a file will be downloaded including all parameters.

### 🔗 Integration with Fuzzing Tools
1. FFUF (Fast Web Fuzzer)
```
ffuf -w params_wordlist.txt -u "https://example.com/FUZZ"
```

2. Wfuzz
```
wfuzz -z file,params_wordlist.txt -u "https://example.com/FUZZ"
```

3. Burp Suite (Intruder)
Save output to a file.
Load into Burp Intruder as a payload list.

📜 License
MIT License - Free for personal and commercial use.

### 📌 GitHub Repository
[https://github.com/yourusername/paramsniffer](https://github.com/cybersecplayground/Paramsniffer)
(Contributions welcome!)

### 🎯 Why ParamSniffer?
- ✅ Faster than manual extraction
- ✅ No install needed (runs in any browser)
- ✅ Perfect for automation (works with ffuf, wfuzz, etc.)
- ✅ Covers all parameter types (URL, cookies, forms, storage, etc.)

Try it now in your browser console! 🚀

⚠️ Stay informed. Stay safe.

🔗 For more OSINT tools & cyber tips, follow us: [@cybersecplayground](https://t.me/cybersecplayground)
