# IsoRender Photo-to-3D Implementation Guide

## Overview
This document outlines the implementation of IsoRender's new "Photo → 3D Walkthrough" feature using Meshy AI and React Three Fiber.

## Prerequisites
- Node.js 18+
- Meshy AI API key (https://meshy.ai)
- Existing IsoRender deployment on Railway + Vercel

## Setup

### 1. Get Meshy AI API Key
1. Go to https://meshy.ai/api
2. Sign up and get your API key
3. Add to Railway environment variables: `MESHY_API_KEY`

### 2. Install Backend Dependencies
```bash
npm install axios uuid
```

### 3. Install Frontend Dependencies
```bash
npm install three @react-three/fiber @react-three/drei
```

## Files Created

### Backend
- `isorender-backend-api.js` - Express routes for 3D generation

### Frontend  
- `isorender-3d-viewer.jsx` - React Three Fiber 3D viewer component

## Environment Variables
```
MESHY_API_KEY=your_meshy_api_key_here
```

## API Endpoints

### POST /api/generate-3d
Generate a 3D model from an image.

**Request:**
```json
{
  "imageUrl": "https://example.com/room.jpg",
  "prompt": "A modern living room with sofa and windows"
}
```

**Response:**
```json
{
  "success": true,
  "taskId": "mesh_xxxxx",
  "status": "processing",
  "message": "3D generation started"
}
```

### GET /api/generate-3d/:taskId
Check generation status.

**Response:**
```json
{
  "taskId": "mesh_xxxxx",
  "status": "SUCCEEDED",
  "modelUrl": "https://cdn.meshy.ai/model.glb",
  "error": null
}
```

## Integration Steps

### Step 1: Add Backend Routes
Add `isorender-backend-api.js` to your Express app:

```javascript
const generate3DRoutes = require('./isorender-backend-api');
app.use('/api', generate3DRoutes);
```

### Step 2: Add Frontend Component
Import and use the 3D viewer in your React app:

```jsx
import ThreeDViewer from './isorender-3d-viewer';

function PhotoTo3DPage() {
  return (
    <ThreeDViewer 
      modelUrl={generatedModelUrl}
      loading={isGenerating}
      onReady={() => console.log('Ready!')}
    />
  );
}
```

## Cost Breakdown

| Item | Cost per render |
|------|-----------------|
| Meshy AI (image-to-3D) | £0.10-0.30 |
| API calls (Claude) | £0.02-0.05 |
| **Total** | **£0.12-0.35** |

## Pricing Strategy

| Tier | Credits | Price | 3D Renders included |
|------|---------|-------|---------------------|
| Starter | 10 | £7 | 5 |
| Pro | 50 | £19 | 25 |
| Agency | 150 | £49 | 75 |

## Troubleshooting

### Model not loading
- Check Meshy API key is set correctly
- Verify the model URL is accessible
- Check CORS settings on your backend

### Slow generation
- Meshy AI typically takes 30-60 seconds
- Consider showing progress indicator
- Implement async job queue for production

### Quality issues
- Use higher resolution input images
- Add more specific prompts
- Consider post-processing in R3F

## Next Steps
1. ✅ Backend API created
2. ⏳ Frontend component created
3. ⬜ Integrate with existing credit system
4. ⬜ Add Stripe payment processing
5. ⬜ Set up webhooks for completion notifications
6. ⬜ Add material customization UI
7. ⬜ Deploy to Railway + Vercel