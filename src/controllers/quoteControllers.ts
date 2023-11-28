import puppeteer from "puppeteer";

import { Url } from "src/types/url";

/**
 * Generates a PDF from a given webpage URL while excluding certain elements.
 * @param {Url} url - The Url object representing the webpage URL.
 * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the PDF data.
 */
export async function generatePDF(url: Url): Promise<Buffer> {
  // Launch a new browser instance using Puppeteer.
  const browser = await puppeteer.launch();
    
  // Open a new page in the browser.
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 8000 });
  // Navigate to the URL. The toString() method of the Url class is used to get the actual URL string.
  await page.goto(url.toString(), {
    waitUntil: "networkidle2",
    timeout: 15000
  });


  // Hide or remove the header and footer before generating the PDF
  // Adjust the selectors as per the actual elements on the website
  await page.evaluate(() => {
    const klavioTradeprogram = document.querySelector(
      ".needsclick.kl-private-reset-css-Xuajs1"
    ) as HTMLElement;
    const axeptio = document.querySelector("#axeptio_overlay") as HTMLElement;
    const header = document.querySelector(".header-container") as HTMLElement;
    const footer = document.querySelector(
      ".footer-max-container.search-modal"
    ) as HTMLElement;
    if (klavioTradeprogram) klavioTradeprogram.style.display = "none";
    if (axeptio) axeptio.style.display = "none";
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
  });

  // Generate a PDF of the current page and store it in a buffer.
  // The format 'A4' is used here, but this can be adjusted as needed.
  const pdfBuffer = await page.pdf({
    format: "A4",
    scale: 0.7,
    printBackground: true,
  });

  // Close the browser instance.
  await browser.close();

  // Return the PDF data as a buffer.
  return pdfBuffer;
}
