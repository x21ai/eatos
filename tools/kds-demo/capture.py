import asyncio, os, pathlib
from playwright.async_api import async_playwright

OUT = pathlib.Path('/tmp/kdsdemo/frames')
OUT.mkdir(parents=True, exist_ok=True)
for f in OUT.glob('*.png'): f.unlink()
url = 'file://' + str(pathlib.Path(__file__).parent.resolve() / 'scene.html')

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        ctx = await b.new_context(viewport={'width':1600,'height':868}, device_scale_factor=1)
        page = await ctx.new_page()
        await page.goto(url, wait_until='load')
        await page.wait_for_timeout(1200)
        meta = await page.evaluate('window.__meta')
        n = meta['frames']; fps = meta['fps']
        print('frames', n)
        for i in range(n):
            await page.evaluate('window.__render(%f)' % (i/fps))
            await page.screenshot(path=str(OUT / f'f{i:04d}.png'))
        await b.close()

asyncio.run(main())
