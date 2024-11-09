import { RequestHandler } from 'express';

interface LipdubPollRequest {
  operationId: string;
}

interface LipdubPollResponse {
  url?: string;
  state: 'QUEUED' | 'PROCESSING' | 'COMPLETE';
  progress?: number;
}

export const lipdubPoll: RequestHandler<{}, LipdubPollResponse, LipdubPollRequest> = async (req, res) => {
  try {
    const { operationId } = req.body;
    
    if (!operationId) {
      res.status(400).json({ 
        error: 'Operation ID is required' 
      } as any);
      return;
    }

    const response = await fetch('https://api.captions.ai/api/lipdub/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CAPTIONS_API_KEY || '',
        'x-operation-id': operationId
      }
    });

    const data = await response.json() as LipdubPollResponse;
    res.json(data);

  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to poll lipdub status' 
    } as any);
  }
};