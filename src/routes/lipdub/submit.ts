import { RequestHandler } from 'express';

interface LipdubSubmitRequest {
  audioUrl: string;
  videoUrl: string;
}

export const lipdubSubmit: RequestHandler<{}, any, LipdubSubmitRequest> = async (req, res) => {
  try {
    const { audioUrl, videoUrl } = req.body;
    
    if (!audioUrl || !videoUrl) {
      res.status(400).json({ 
        error: 'Both audioUrl and videoUrl are required' 
      });
      return;
    }

    const response = await fetch('https://api.captions.ai/api/lipdub/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CAPTIONS_API_KEY || ''
      },
      body: JSON.stringify({
        audioUrl,
        videoUrl
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to submit lipdub request' 
    });
  }
};