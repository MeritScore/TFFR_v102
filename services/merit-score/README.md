<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: <https://ai.studio/apps/drive/1Lfi2ctPL1mIwD7NrvLiTtoy7YWF3gzgt>

## Deployment

The application is deployed to Google Cloud Run and can be accessed via the following links:

* **Custom Domain**: [https://thefunfanreporter.com/](https://thefunfanreporter.com/)
* **Official Cloud Run URL**: [https://merit-score-223594773840.us-central1.run.app/](https://merit-score-223594773840.us-central1.run.app/)

> [!IMPORTANT]
> Do not append `:8080` to the URLs above. Port 8080 is internal to the container and not exposed for external traffic.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
