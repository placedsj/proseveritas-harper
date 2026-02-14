<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1-XWJReMTlJm1U_oTipZmMPXf4angpr56

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow that automatically builds and deploys the app to GitHub Pages.

### Setup Instructions

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Choose `gh-pages` branch and `/ (root)` folder
   - Click Save

2. **Trigger Deployment:**
   - The workflow automatically runs on every push to the `main` branch
   - You can also manually trigger it from Actions → Deploy to GitHub Pages → Run workflow

3. **Access Your Site:**
   - After deployment, your site will be available at: `https://placedsj.github.io/proseveritas-harper/`

### Local Testing

To test the production build locally:
```bash
npm ci
npm run build
# Install and use a static server
npm i -g serve
serve dist -p 3000
```

The app will be accessible at `http://localhost:3000/proseveritas-harper/`

### Important Notes

- GitHub Pages serves static files only
- Any API features require appropriate CORS configuration and API keys
- The `base` path is configured in `vite.config.ts` for proper asset loading

