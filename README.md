# Twilio GPT-4o Realtime Voice Bridge

This is a minimal Node.js server that bridges Twilio Voice Media Streams to the OpenAI GPT-4o Realtime API for real-time voice interaction.

## Features

- `/voice` POST endpoint that returns TwiML to start Twilio Media Streams.
- WebSocket server at `/twilio-media` to handle media streaming between Twilio and GPT-4o.
- Bi-directional streaming audio conversion placeholders (μ-law 8kHz ↔ PCM16 16kHz).
- Real-time streaming integration with GPT-4o Realtime API.

## Requirements

- Node.js 18 or higher.
- Twilio Programmable Voice with Media Streams enabled.
- OpenAI API key with access to Realtime GPT-4o models.
- A publicly accessible HTTPS URL for Twilio webhook callbacks (e.g. via ngrok during development).

## Installation

1. Clone or download this project.
2. Run `npm install` to install dependencies.
3. Add environment variables for your OpenAI API key and Twilio credentials as needed.
4. Run the server:


## Usage

- Configure your Twilio phone number webhook to point to `/voice`.
- When a call comes in, Twilio will start media streaming to `/twilio-media` WebSocket.
- Audio is relayed to GPT-4o and streamed back in real-time to the caller.

## Audio Format Details

- Twilio stream audio is μ-law encoded at 8 kHz.
- GPT-4o expects PCM 16-bit, 16 kHz audio.
- You will need to implement audio decoding, resampling, and encoding functions for production use.

## Notes

- This is a minimal demo focusing on core architecture.
- Make sure to handle authentication and secure WebSocket connections for production.
- Check Twilio and OpenAI docs for updated endpoints and model names.

## References

- [Twilio Media Streams](https://www.twilio.com/docs/voice/media-streams)
- [OpenAI Realtime API](https://platform.openai.com/docs/guides/realtime)
- [Twilio Programmable Voice](https://www.twilio.com/docs/voice)

---

This project was inspired by recent developments in real-time AI voice assistant integration with Twilio and OpenAI GPT-4o Realtime API.

