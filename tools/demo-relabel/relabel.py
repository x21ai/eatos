"""Relabel the location name in the Dashboard and InventoryOS demo clips.

The source clips are screen recordings, so the location pill is patched frame by
frame: the text area is repainted with the pill background sampled from that same
frame, then the new location name is drawn in Montserrat at the original size.

Usage:
  python3 tools/demo-relabel/relabel.py dashboard /tmp/dash/dash.mp4 /tmp/out/dash
  python3 tools/demo-relabel/relabel.py inventoryos /tmp/dash/inv.mp4 /tmp/out/inv
"""

import pathlib
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

# DejaVu Sans matches the weight and darkness of the recorded UI label most closely.
FONT = "/nix/store/xbs17gmksi0pljxcs4l6gshklzpmv8gr-dejavu-fonts-2.37/share/fonts/truetype/DejaVuSans.ttf"

# text box (x0, y0, x1, y1), text anchor point, font size, background sample point,
# and pin box: the region holding the location pin icon. When no dark pixel is found
# there the pill is not on screen for that frame (page load), so the frame is left alone.
CLIPS = {
    "dashboard": {
        "text": "Riverside",
        "box": (114, 46, 254, 73),
        "anchor": (120, 59),
        "size": 14,
        "sample": (268, 59),
        "pin": (96, 50, 112, 70),
    },
    "inventoryos": {
        "text": "Harbor",
        "box": (129, 12, 173, 37),
        "anchor": (131, 24),
        "size": 12,
        "sample": (190, 24),
        "pin": (111, 16, 127, 34),
    },
}


def main() -> None:
    name, src, outdir = sys.argv[1], pathlib.Path(sys.argv[2]), pathlib.Path(sys.argv[3])
    cfg = CLIPS[name]
    frames = outdir / "frames"
    frames.mkdir(parents=True, exist_ok=True)
    for old in frames.glob("*.png"):
        old.unlink()

    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", str(src), str(frames / "f%05d.png")],
        check=True,
    )

    font = ImageFont.truetype(FONT, cfg["size"])
    files = sorted(frames.glob("*.png"))
    patched = 0
    for path in files:
        im = Image.open(path).convert("RGB")
        pin = im.crop(cfg["pin"]).convert("L")
        if min(pin.getdata()) > 140:
            continue
        region = im.crop(cfg["box"])
        bg = max(region.getcolors(region.width * region.height))[1]
        draw = ImageDraw.Draw(im)
        draw.rectangle(cfg["box"], fill=bg)
        draw.text(cfg["anchor"], cfg["text"], font=font, fill=(24, 24, 27), anchor="lm")
        im.save(path)
        patched += 1
    print("patched", patched, "of", len(files), "frames")



if __name__ == "__main__":
    main()
