"""Downloads the CDN scripts and fonts the app uses, so the APK works fully offline."""
import re, os, urllib.request
WWW = "app/src/main/assets/www"
UA = {"User-Agent": "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Mobile Safari/537.36"}
def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
files = ["support.js", "index.html", "FrascoMini.dc.html"]
for f in files:
    p = os.path.join(WWW, f); t = open(p, encoding="utf-8").read()
    for url in sorted(set(re.findall(r"https://unpkg\.com/[^\"'\s)]+", t))):
        local = "vendor/" + url[len("https://unpkg.com/"):]
        dst = os.path.join(WWW, local); os.makedirs(os.path.dirname(dst), exist_ok=True)
        if not os.path.exists(dst):
            open(dst, "wb").write(get(url)); print("got", url)
        t = t.replace(url, "./" + local if f != "support.js" else local)
    open(p, "w", encoding="utf-8").write(t)
# fonts
for css_path in [os.path.join(r, n) for r, _, ns in os.walk(WWW) for n in ns if n.endswith(".css")]:
    t = open(css_path, encoding="utf-8").read()
    for url in sorted(set(re.findall(r"https://fonts\.googleapis\.com/css2\?[^\"')\s]+", t))):
        css = get(url).decode()
        os.makedirs(os.path.join(WWW, "vendor/fonts"), exist_ok=True)
        for i, furl in enumerate(sorted(set(re.findall(r"https://fonts\.gstatic\.com/[^)\s]+", css)))):
            name = "f%03d_%s" % (i, os.path.basename(furl))
            open(os.path.join(WWW, "vendor/fonts", name), "wb").write(get(furl))
            css = css.replace(furl, name)
        open(os.path.join(WWW, "vendor/fonts/fonts.css"), "w").write(css)
        rel = os.path.relpath(os.path.join(WWW, "vendor/fonts/fonts.css"), os.path.dirname(css_path))
        t = t.replace(url, rel)
        print("fonts ->", rel)
    open(css_path, "w", encoding="utf-8").write(t)
