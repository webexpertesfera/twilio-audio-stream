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
