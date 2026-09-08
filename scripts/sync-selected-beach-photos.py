from pathlib import Path

path = Path("js/photos.js")
text = path.read_text(encoding="utf-8")

if '"simius": {' in text:
    print("selected beach registry already synced")
    raise SystemExit(0)

anchor = '  "bastione": {'
if anchor not in text:
    raise SystemExit("bastione anchor not found in js/photos.js")

entries = '''  "simius": {
    "file":"images/beaches/simius.webp","width":1280,"height":960,"position":"50% 50%",
    "alt":{"it":"Spiaggia di Simius a Villasimius","en":"Simius beach in Villasimius","de":"Strand von Simius in Villasimius"},
    "author":"Muzzudan","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/","source":"https://commons.wikimedia.org/wiki/File:Simius_Beach_-_Villasimius.jpg","status":"APPROVATA_USO","thumb":"images/beaches/simius-800.webp"
  },
  "cala_sinzias": {
    "file":"images/beaches/cala-sinzias.webp","width":1280,"height":853,"position":"50% 50%",
    "alt":{"it":"Spiaggia di Cala Sinzias a Castiadas","en":"Cala Sinzias beach in Castiadas","de":"Strand Cala Sinzias in Castiadas"},
    "author":"Giorgio Galeotti","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/","source":"https://commons.wikimedia.org/wiki/File:Spiaggia_-_Cala_Sinzias,_Castiadas,_Cagliari,_Italia_-_29_Maggio_2026_01.jpg","status":"APPROVATA_USO","thumb":"images/beaches/cala-sinzias-800.webp"
  },
  "is_arutas": {
    "file":"images/beaches/is-arutas.webp","width":1280,"height":871,"position":"50% 50%",
    "alt":{"it":"Spiaggia di Is Arutas nella penisola del Sinis","en":"Is Arutas beach on the Sinis peninsula","de":"Strand Is Arutas auf der Sinis-Halbinsel"},
    "author":"William Kimmerle","license":"CC BY 4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","source":"https://commons.wikimedia.org/wiki/File:Is_Aruttas_Beach.jpg","status":"APPROVATA_USO","thumb":"images/beaches/is-arutas-800.webp"
  },
  "san_giovanni_sinis": {
    "file":"images/beaches/san-giovanni-sinis.webp","width":1280,"height":853,"position":"50% 50%",
    "alt":{"it":"Spiaggia e torre di San Giovanni di Sinis","en":"Beach and tower of San Giovanni di Sinis","de":"Strand und Turm von San Giovanni di Sinis"},
    "author":"Mike Peel","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/","source":"https://commons.wikimedia.org/wiki/File:At_Tharros,_Sardinia_2024_010.jpg","status":"APPROVATA_USO","thumb":"images/beaches/san-giovanni-sinis-800.webp"
  },
  "la_pelosa": {
    "file":"images/beaches/la-pelosa.webp","width":1280,"height":852,"position":"50% 50%",
    "alt":{"it":"La Pelosa a Stintino con mare turchese e torre","en":"La Pelosa in Stintino with turquoise sea and tower","de":"La Pelosa in Stintino mit türkisfarbenem Meer und Turm"},
    "author":"goldpicasa","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0/","source":"https://commons.wikimedia.org/wiki/File:Stintino,_La_Pelosa_beach_-_panoramio_(2).jpg","status":"APPROVATA_USO","thumb":"images/beaches/la-pelosa-800.webp"
  },
  "cala_brandinchi": {
    "file":"images/beaches/cala-brandinchi.webp","width":1280,"height":851,"position":"50% 50%",
    "alt":{"it":"Cala Brandinchi e le sue acque basse turchesi","en":"Cala Brandinchi and its shallow turquoise waters","de":"Cala Brandinchi mit flachem türkisfarbenem Wasser"},
    "author":"Ramon Espiña Fernandez","license":"CC BY-SA 3.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/","source":"https://commons.wikimedia.org/wiki/File:Cala_Brandinchi_-_Cerde%C3%B1a_-_panoramio.jpg","status":"APPROVATA_USO","thumb":"images/beaches/cala-brandinchi-800.webp"
  },
  "cala_luna": {
    "file":"images/beaches/cala-luna.webp","width":1280,"height":848,"position":"50% 50%",
    "alt":{"it":"Cala Luna nel Golfo di Orosei","en":"Cala Luna in the Gulf of Orosei","de":"Cala Luna im Golf von Orosei"},
    "author":"Sven Jungnickel","license":"CC BY-SA 3.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/","source":"https://commons.wikimedia.org/wiki/File:Cala_Luna.jpg","status":"APPROVATA_USO","thumb":"images/beaches/cala-luna-800.webp"
  },
'''

text = text.replace(anchor, entries + anchor)
path.write_text(text, encoding="utf-8")
print("synced selected beach entries into js/photos.js")
