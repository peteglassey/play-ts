import express from 'express';
import type { Request, Response } from 'express';
import { Connection, Client } from '@temporalio/client';
import { greetingWorkflow, setName } from './workflows/greeting-workflow';


const app = express(); 
app.use(express.json());

const PORT = 3000;

// Initialize Temporal connection and client once
let connection: Connection;
let client: Client;

async function initTemporal() {
  connection = await Connection.connect();
  client = new Client({ connection });
}

// POST /start
app.post('/start', async (req, res) => {
  const name = req.body.name ?? 'World';
  const workflowId = `greet-${Date.now()}`;

  const handle = await client.workflow.start<typeof greetingWorkflow>(greetingWorkflow, {
    args: [name],
    taskQueue: 'greeting-queue',
    workflowId,
  });

  res.json({ workflowId });
});

// POST /signal
app.post('/signal', async (req, res) => {
    const { workflowId, newName } = req.body;
  
    if (!workflowId || !newName) {
      res.status(400).json({ error: 'workflowId and newName are required' });
      return;
    }
  
    const handle = client.workflow.getHandle(workflowId);
    await handle.signal(setName, newName);
  
    res.json({ message: 'Signal sent' });
  });

// GET /result/:workflowId
app.get('/result/:workflowId', async (req, res) => {
  const { workflowId } = req.params;

  try {
    const handle = client.workflow.getHandle(workflowId);
    const result = await handle.result();
    res.json({ result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start Express
initTemporal().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Express API listening at http://localhost:${PORT}`);
  });
});
