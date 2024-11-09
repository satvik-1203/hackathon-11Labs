import express from "express";
import { textToVid, agentSignedUrl } from "./textToVid";
import { captionsPoll, captionsSubmit } from "./routes/captions"; // Add this import

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: process.env.XI_API_KEY, agentId: process.env.AGENT_ID });
  return;
});

app.post("/agent-signed-url", agentSignedUrl);

// Captions API
app.post('/captions-poll', captionsPoll);
app.post('/captions-submit', captionsSubmit);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
