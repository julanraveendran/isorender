/**
 * IsoRender Backend - Photo to 3D API
 * Uses Meshy AI for image-to-3D generation
 * 
 * Endpoints:
 * POST /api/generate-3d - Generate 3D model from image
 * GET  /api/generate-3d/:taskId - Check generation status
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Meshy AI configuration
const MESHY_API_KEY = process.env.MESHY_API_KEY;
const MESHY_API_URL = 'https://api.meshy.ai/v2';

// In-memory task storage (use Redis in production)
const taskStore = new Map();

/**
 * Submit image-to-3D generation task to Meshy AI
 * POST /api/generate-3d
 * Body: { imageUrl: string, prompt?: string }
 */
router.post('/generate-3d', async (req, res) => {
  try {
    const { imageUrl, prompt } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl is required' });
    }

    // Call Meshy AI API to create 3D model
    const response = await axios.post(
      `${MESHY_API_URL}/image-to-3d`,
      {
        image_url: imageUrl,
        enable_pbr: true,
        prompt: prompt || 'A room interior with walls, floor, and furniture'
      },
      {
        headers: {
          'Authorization': `Bearer ${MESHY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const { result, task_id } = response.data;

    if (result === 'IN_QUEUE' || result === 'PROCESSING') {
      // Store task info
      const taskData = {
        id: task_id,
        status: 'processing',
        imageUrl,
        prompt,
        createdAt: new Date().toISOString()
      };
      taskStore.set(task_id, taskData);

      return res.json({
        success: true,
        taskId: task_id,
        status: 'processing',
        message: '3D generation started'
      });
    }

    return res.json({
      success: false,
      error: 'Unexpected response from Meshy API'
    });

  } catch (error) {
    console.error('Meshy API error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Failed to start 3D generation',
      details: error.response?.data || error.message
    });
  }
});

/**
 * Check status of 3D generation task
 * GET /api/generate-3d/:taskId
 */
router.get('/generate-3d/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const cachedTask = taskStore.get(taskId);

    if (!cachedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check Meshy API for status
    const response = await axios.get(
      `${MESHY_API_URL}/image-to-3d/${taskId}`,
      {
        headers: {
          'Authorization': `Bearer ${MESHY_API_KEY}`
        }
      }
    );

    const { status, model_url, error } = response.data;

    // Update cached task
    const updatedTask = {
      ...cachedTask,
      status,
      modelUrl: model_url,
      error,
      updatedAt: new Date().toISOString()
    };
    taskStore.set(taskId, updatedTask);

    return res.json({
      taskId,
      status,
      modelUrl: model_url || null,
      error: error || null
    });

  } catch (error) {
    console.error('Status check error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Failed to check task status',
      details: error.response?.data || error.message
    });
  }
});

/**
 * Webhook handler for Meshy AI callbacks (optional)
 * POST /api/generate-3d/webhook
 */
router.post('/generate-3d/webhook', async (req, res) => {
  try {
    const { task_id, status, model_url, error } = req.body;

    if (task_id && taskStore.has(task_id)) {
      const task = taskStore.get(task_id);
      task.status = status;
      task.modelUrl = model_url;
      task.error = error;
      task.completedAt = new Date().toISOString();
      taskStore.set(task_id, task);

      // TODO: Send notification to user (email, webhook, etc.)
      console.log(`Task ${task_id} completed with status: ${status}`);
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;