import express from 'express';

import generatePDF from 'src/controllers/quoteControllers';
import { Url } from 'src/types/url';


// Create a router object from Express. 
// This router will handle all requests coming to the '/quotes' endpoint.
const router = express.Router();

// Define a POST route for '/generate-pdf'.
// This route will be used to receive a URL and return a PDF generated from that URL.
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
    const pdfBuffer = await generatePDF(url.toString());

    // Set the Content-Type of the response to 'application/pdf'.
    // This tells the client that the server is returning a PDF file.
    res.contentType('application/pdf');

    // Send the PDF Buffer as the response.
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


export default router;
