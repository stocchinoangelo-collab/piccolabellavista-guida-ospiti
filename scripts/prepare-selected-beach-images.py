from __future__ import annotations

from pathlib import Path
from urllib.request import Request, urlopen
from io import BytesIO
from PIL import Image

OUT = Path("images/beaches")
OUT.mkdir(parents=True, exist_ok=True)

IMAGES = {
    "mari-pintau": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Cala_Mari_Pintau_-_panoramio.jpg/1600px-Cala_Mari_Pintau_-_panoramio.jpg",
    "chia-su-giudeu": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Dune_di_Chia.jpg/1600px-Dune_di_Chia.jpg",
    "tuerredda": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Isola_Tuerredda.png/1600px-Isola_Tuerredda.png",
    "porto-giunco": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Aerial_view_of_the_beach_of_Porto_Giunco_%28Spiaggia_di_Porto_Giunco%29_and_the_nearby_lake_Stagno_di_Notteri_in_Sardinia%2C_Italy_%2848402731012%29.jpg/1600px-Aerial_view_of_the_beach_of_Porto_Giunco_%28Spiaggia_di_Porto_Giunco%29_and_the_nearby_lake_Stagno_di_Notteri_in_Sardinia%2C_Italy_%2848402731012%29.jpg",
    "punta-molentis": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Aerial_view_of_Punta_Molentis_Beach_in_Sardinia%2C_Italy_%2848399314582%29.jpg/1600px-Aerial_view_of_Punta_Molentis_Beach_in_Sardinia%2C_Italy_%2848399314582%29.jpg",
}


def fetch(url: str) -> Image.Image:
    req = Request(url, headers={"User-Agent": "PiccolabellavistaGuestGuide/1.0 (image preparation)"})
    with urlopen(req, timeout=60) as response:
        return Image.open(BytesIO(response.read())).convert("RGB")


def save_webp(image: Image.Image, path: Path, max_width: int, quality: int = 84) -> None:
    if image.width > max_width:
        height = round(image.height * max_width / image.width)
        image = image.resize((max_width, height), Image.Resampling.LANCZOS)
    image.save(path, "WEBP", quality=quality, method=6)


for slug, url in IMAGES.items():
    image = fetch(url)
    save_webp(image, OUT / f"{slug}.webp", 1600)
    save_webp(image, OUT / f"{slug}-800.webp", 800, 82)
    print(f"prepared {slug}: {image.width}x{image.height}")
