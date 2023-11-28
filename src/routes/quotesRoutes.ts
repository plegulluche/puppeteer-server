import express, { Request, Response } from 'express'

import generatePDF from 'src/controllers/quoteControllers';



const router = express.Router();


router.post('/generate-pdf', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).send({ error: 'URL is required' });
    }

    const pdfBuffer = await generatePDF(url);

    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;