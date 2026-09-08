from pathlib import Path
import urllib.request
from PIL import Image

URL = 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Torre_e_faro_di_Calamosca.jpg'
out_dir = Path('images/restaurants')
out_dir.mkdir(parents=True, exist_ok=True)
source = out_dir / 'calamosca-context-cristiano-cani.jpg'
webp = out_dir / 'calamosca-context-cristiano-cani.webp'
thumb = out_dir / 'calamosca-context-cristiano-cani-800.webp'

if not webp.exists():
    if not source.exists():
        urllib.request.urlretrieve(URL, source)
    with Image.open(source) as im:
        im = im.convert('RGB')
        im.save(webp, 'WEBP', quality=86, method=6)
        t = im.copy()
        t.thumbnail((800, 800))
        t.save(thumb, 'WEBP', quality=84, method=6)

photos = Path('js/photos.js')
text = photos.read_text(encoding='utf-8')
if '"calamosca_context"' not in text:
    marker = '\n};\n'
    block = '''\n  ,\n  "calamosca_context": {\n    "file":"images/restaurants/calamosca-context-cristiano-cani.webp",\n    "width":2589,\n    "height":1359,\n    "position":"50% 50%",\n    "alt":{\n      "it":"Torre e faro di Calamosca sul promontorio di Capo Sant’Elia",\n      "en":"Calamosca tower and lighthouse on the Capo Sant’Elia headland",\n      "de":"Turm und Leuchtturm von Calamosca am Kap Sant’Elia"\n    },\n    "author":"Cristiano Cani",\n    "license":"CC BY 2.0",\n    "licenseUrl":"https://creativecommons.org/licenses/by/2.0/",\n    "source":"https://commons.wikimedia.org/wiki/File:Torre_e_faro_di_Calamosca.jpg",\n    "status":"APPROVATA_USO_FALLBACK_AMBIENTALE",\n    "thumb":"images/restaurants/calamosca-context-cristiano-cani-800.webp"\n  }\n'''
    idx = text.rfind(marker)
    if idx == -1:
        raise SystemExit('photos registry terminator not found')
    text = text[:idx] + block + text[idx:]
    photos.write_text(text, encoding='utf-8')

credits = Path('PHOTO_CREDITS.md')
c = credits.read_text(encoding='utf-8')
entry = '- calamosca_context: Cristiano Cani — [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) — [Fonte originale](https://commons.wikimedia.org/wiki/File:Torre_e_faro_di_Calamosca.jpg). Asset: `images/restaurants/calamosca-context-cristiano-cani.webp`. Fallback ambientale, non foto del locale.\n'
if 'calamosca_context:' not in c:
    c = c.rstrip() + '\n\n' + entry
    credits.write_text(c, encoding='utf-8')

rights = Path('docs/RESTAURANT_PHOTO_RIGHTS.md')
r = rights.read_text(encoding='utf-8')
r = r.replace('| Le Terrazze di Calamosca | foto n.1, terrazza al tramonto | TripAdvisor | PENDING_PERMISSION | NO | Chiedere foto ufficiale con autorizzazione scritta oppure usare placeholder |', '| Le Terrazze di Calamosca | foto n.1, terrazza al tramonto | TripAdvisor | PENDING_PERMISSION | NO | Fallback ambientale APPROVATO: Torre e faro di Calamosca, Cristiano Cani, CC BY 2.0; non presentarlo come foto del locale |')
rights.write_text(r, encoding='utf-8')

if source.exists():
    source.unlink()
