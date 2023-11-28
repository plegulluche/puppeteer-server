import puppeteer from "puppeteer";
import { Url } from "src/types/url";

export async function generatePDF(url: Url): Promise<Buffer> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url.toString(), { waitUntil: "networkidle0" });

  // Hide or remove the header and footer before generating the PDF
  // Adjust the selectors as per the actual elements on the website
  await page.evaluate(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
  });

  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  return pdfBuffer;
}
