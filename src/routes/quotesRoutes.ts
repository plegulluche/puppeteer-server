import express from 'express';

import { generatePDF } from '../controllers/quoteControllers';
import { Url } from '../types/url';

// Create a router object from Express.
// This router will handle all requests coming to the '/quotes' endpoint.
const router = express.Router();

/**
 * @openapi
 * /quotes/generate-pdf:
 *   post:
 *     summary: Generate a PDF from a URL
 *     description: Receives a URL and returns a generated PDF.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the generated PDF.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad request, URL is required.
 *       500:
 *         description: Server error.
 */
router.post('/generate-pdf', async (req, res) => {
  try {
    // Extract the URL from the request body.
    // Expecting the client to send a JSON object with a 'url' property.
    const urlStr = req.body.url;
    if (!urlStr) {
      // If no URL is provided in the request, return a 400 Bad Request error.
      return res.status(400).send({ error: 'URL is required' });
    }

    // Create a new Url object using the provided URL string.
    // The Url class will automatically validate the URL.
    // If the URL is invalid, it will throw an error which is caught in the catch block.
    const url = new Url(urlStr);

    // Call the generatePDF function, passing the URL string.
    // This function is expected to return a PDF file in a Buffer format.
    const pdfBuffer = await generatePDF(url);

    // Set the Content-Type of the response to 'application/pdf'.
    // This tells the client that the server is returning a PDF file.
    res.contentType('application/pdf');

    // Send the PDF Buffer as the response.
    res.send(pdfBuffer);
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).send({ error: errorMessage });
  }
});

export default router;
