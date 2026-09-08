import asyncio, pathlib, sys
from playwright.async_api import async_playwright

OUT = pathlib.Path('/tmp/kioskportrait/frames')
OUT.mkdir(parents=True, exist_ok=True)
for f in OUT.glob('*.png'):
    f.unlink()
url = 'file://' + str(pathlib.Path(__file__).parent.resolve() / 'scene.html')

STILLS = [float(x) for x in sys.argv[1:]]


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        ctx = await b.new_context(viewport={'width': 900, 'height': 1600}, device_scale_factor=1)
        page = await ctx.new_page()
        await page.goto(url, wait_until='load')
        await page.wait_for_timeout(1800)
        meta = await page.evaluate('window.__meta')
        n, fps = meta['frames'], meta['fps']
        if STILLS:
            for s in STILLS:
                await page.evaluate('window.__render(%f)' % s)
                await page.screenshot(path='/tmp/kioskportrait/still-%05.1f.png' % s)
            print('stills', STILLS)
        else:
            print('frames', n, flush=True)
            for i in range(n):
                await page.evaluate('window.__render(%f)' % (i / fps))
                await page.screenshot(path=str(OUT / f'f{i:04d}.png'))
                if i % 100 == 0:
                    print('at', i, flush=True)
        await b.close()


asyncio.run(main())
