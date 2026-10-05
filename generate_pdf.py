import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    html_path = os.path.abspath("MicroFinance_Project_Client_Overview.html")
    pdf_path = os.path.abspath("MicroFinance_Software_Specification_and_Feature_Guide.pdf")
    
    print(f"Converting {html_path} to {pdf_path}...")
    async with async_playwright() as p:
        # Launch browser (try chromium or msedge or chrome channel)
        try:
            browser = await p.chromium.launch(headless=True, channel="msedge")
        except Exception:
            try:
                browser = await p.chromium.launch(headless=True, channel="chrome")
            except Exception:
                browser = await p.chromium.launch(headless=True)
                
        page = await browser.new_page()
        await page.goto(f"file:///{html_path.replace(os.sep, '/')}", wait_until="networkidle")
        
        await page.pdf(
            path=pdf_path,
            format="A4",
            print_background=True,
            margin={"top": "0mm", "bottom": "0mm", "left": "0mm", "right": "0mm"}
        )
        await browser.close()
    print("PDF generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
