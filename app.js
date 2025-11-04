import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { xml } from 'xmlbuilder2';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));

// /voice endpoint to respond with TwiML that starts media streaming
app.post('/voice', (req, res) => {
  const twiml = xml({ version: '1.0' })
    .ele('Response')
      .ele('Start')
        .ele('Stream', { url: `wss://${req.headers.host}/twilio-media` })
        .up()
      .up()
    .up()
    .end({ prettyPrint: true });
  res.type('text/xml');
  res.send(twiml);
});

// Create HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/twilio-media' });

// Placeholder: convert Twilio ulaw 8kHz audio chunk to PCM16 16kHz
function ulaw8kToPcm16_16kHz(ulawData) {
  // Implement audio decoding + resampling here
  return ulawData; // For demo, just pass-through. Replace this with real conversion.
}

// Placeholder: convert PCM16 16kHz audio chunk to ulaw 8kHz for Twilio playback
function pcm16_16kHzToUlaw8k(pcmData) {
  // Implement audio encoding + downsampling here
  return pcmData; // For demo, just pass-through. Replace this with real conversion.
}

wss.on('connection', (ws) => {
  console.log('Twilio Media Stream connected');

  // Open WebSocket to GPT-4o Realtime API
  const gptWs = new WebSocket('wss://api.openai.com/realtime');

  gptWs.on('open', () => {
    console.log('Connected to GPT-4o Realtime API');
  });

  gptWs.on('message', (message) => {
    // Assuming message is audio chunk from GPT-4o
    const audioChunk = Buffer.from(message);
    const ulawAudio = pcm16_16kHzToUlaw8k(audioChunk);
    // Send back to Twilio
    ws.send(ulawAudio);
  });

  gptWs.on('close', () => {
    console.log('GPT-4o WebSocket closed');
  });

  gptWs.on('error', (err) => {
    console.error('GPT-4o WebSocket error', err);
  });

  ws.on('message', (msg) => {
    // Twilio sends JSON with base64 audio payload in "media" object
    const data = JSON.parse(msg);
    if (data.event === 'media') {
      const mediaPayload = Buffer.from(data.media.payload, 'base64');
      const pcmAudio = ulaw8kToPcm16_16kHz(mediaPayload);
      // Send PCM audio to GPT-4o Realtime API
      gptWs.send(pcmAudio);
    } else if (data.event === 'start') {
      console.log('Media stream started');
    } else if (data.event === 'stop') {
      console.log('Media stream stopped');
      gptWs.close();
      ws.close();
    }
  });

  ws.on('close', () => {
    console.log('Twilio connection closed');
    gptWs.close();
  });

  ws.on('error', (err) => {
    console.error('Twilio WS error', err);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
