from __future__ import annotations

from io import BytesIO
from pathlib import Path
from time import sleep
from urllib.error import HTTPError
from urllib.parse import quote
from urllib.request import Request, urlopen

from PIL import Image

OUT = Path("images/beaches")
OUT.mkdir(parents=True, exist_ok=True)

FILES = {
    "mari-pintau": "Cala Mari Pintau - panoramio.jpg",
    "chia-su-giudeu": "Dune di Chia.jpg",
    "tuerredda": "Isola Tuerredda.png",
    "porto-giunco": "Aerial view of the beach of Porto Giunco (Spiaggia di Porto Giunco) and the nearby lake Stagno di Notteri in Sardinia, Italy (48402731012).jpg",
    "punta-molentis": "Aerial view of Punta Molentis Beach in Sardinia, Italy (48399314582).jpg",
}


def commons_url(filename: str) -> str:
    return "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + quote(filename, safe="") + "?width=1280"


def fetch(filename: str) -> Image.Image:
    url = commons_url(filename)
    req = Request(
        url,
        headers={
            "User-Agent": "PiccolabellavistaGuestGuide/1.0 (non-commercial guest guide; contact via GitHub repository)",
            "Accept": "image/avif,image/webp,image/png,image/jpeg,*/*",
        },
    )
    delays = (0, 15, 45, 90)
    last_error: Exception | None = None
    for delay in delays:
        if delay:
            sleep(delay)
        try:
            with urlopen(req, timeout=120) as response:
                data = response.read()
            return Image.open(BytesIO(data)).convert("RGB")
        except HTTPError as exc:
            last_error = exc
            if exc.code != 429:
                raise
            print(f"Commons rate limit (429); cooldown before retry: {filename}")
    assert last_error is not None
    raise last_error


def save_webp(image: Image.Image, path: Path, max_width: int, quality: int = 84) -> None:
    if image.width > max_width:
        height = round(image.height * max_width / image.width)
        image = image.resize((max_width, height), Image.Resampling.LANCZOS)
    image.save(path, "WEBP", quality=quality, method=6)


for index, (slug, filename) in enumerate(FILES.items()):
    if index:
        sleep(12)
    image = fetch(filename)
    save_webp(image, OUT / f"{slug}.webp", 1280)
    save_webp(image, OUT / f"{slug}-800.webp", 800, 82)
    print(f"prepared {slug}: {image.width}x{image.height}")
