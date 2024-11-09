import { RequestHandler } from 'express';

interface CaptionsPollRequest {
  operationId: string;
}

interface CaptionsSubmitRequest {
  script: string;
  creatorName?: string;
  webhookId?: string;
}

export const captionsPoll: RequestHandler<{}, any, CaptionsPollRequest> = async (req, res, next) => {
  try {
    const { operationId } = req.body;
    
    if (!operationId) {
      res.status(400).json({ 
        error: 'Operation ID is required' 
      });
      return;
    }

    const response = await fetch('https://api.captions.ai/api/creator/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CAPTIONS_API_KEY || '',
        'x-operation-id': operationId
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to poll caption status' 
    });
  }
};

export const captionsSubmit: RequestHandler<{}, any, CaptionsSubmitRequest> = async (req, res, next) => {
  try {
    const { script, creatorName = 'Kate', webhookId } = req.body;
    
    if (!script) {
      res.status(400).json({ 
        error: 'Script is required' 
      });
      return;
    }

    if (script.length > 800) {
      res.status(400).json({ 
        error: 'Script must be 800 characters or less' 
      });
      return;
    }

    const response = await fetch('https://api.captions.ai/api/creator/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CAPTIONS_API_KEY || ''
      },
      body: JSON.stringify({
        script,
        creatorName,
        ...(webhookId && { webhookId })
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to submit caption request' 
    });
  }
};