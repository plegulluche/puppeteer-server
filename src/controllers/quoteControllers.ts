import puppeteer, { Page } from "puppeteer";

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

  // Navigate to the URL. The toString() method of the Url class is used to get the actual URL string.
  await page.goto(url.toString(), { waitUntil: "networkidle0" });

  // Closing the join trade program pop up
  await closePopup(page, ".needsclick.klaviyo-close-form.kl-private-reset-css-Xuajs1");

  // Accepting cookie
  await closePopup(page, ".ButtonGroup__BtnStyle-sc-1usw1pe-0.kPbSIZ");

  // Closing the header pop up
  await closePopup(page, ".intercom-2lb28a.e11klbxp7");

  // Hide or remove the header and footer before generating the PDF
  // Adjust the selectors as per the actual elements on the website
  await page.evaluate(() => {
    const header = document.querySelector("header-container") as HTMLElement;
    const footer = document.querySelector(
      "footer-max-container search-modal"
    ) as HTMLElement;
    

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

async function closePopup(page: Page, selector: string) {
    console.log('PAGE closepopo: ', page, "selector: " ,selector)
  try {
    await page.waitForSelector(selector, { timeout: 15000 }); // tweak the timeout for better optimisation
    await page.click(selector);
  } catch (error) {
    console.log(`Popup with selector ${selector} not found. Continuing.... `);
  }
}
