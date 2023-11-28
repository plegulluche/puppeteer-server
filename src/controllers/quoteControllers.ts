import puppeteer from "puppeteer";

import { Url } from "src/types/url";

/**
 * Generates a PDF from a given webpage URL while excluding certain elements.
 * @param {Url} urlObj - The Url object representing the webpage URL.
 * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the PDF data.
 */
export async function generatePDF(url: Url): Promise<Buffer> {
    
  // Launch a new browser instance using Puppeteer.
  const browser = await puppeteer.launch();

  // Open a new page in the browser.
  const page = await browser.newPage();

  // Navigate to the URL. The toString() method of the Url class is used to get the actual URL string.
  await page.goto(url.toString(), { waitUntil: "networkidle0" });

  // Hide or remove the header and footer before generating the PDF
  // Adjust the selectors as per the actual elements on the website
  await page.evaluate(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
  });

  // Generate a PDF of the current page and store it in a buffer.
  // The format 'A4' is used here, but this can be adjusted as needed.
  const pdfBuffer = await page.pdf({ format: "A4" });

  // Close the browser instance.
  await browser.close();

  // Return the PDF data as a buffer.
  return pdfBuffer;
}
