import express from 'express'
import 'dotenv/config'
import type { Request,Response } from 'express';
import { connectDb } from './dbConfig.js';
import mongoose from 'mongoose';
const  app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.get('/',(req:Request,res:Response)=>{
     res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>server status</title>
</head>
<body>
      <div style="text-align: center; background-color: black; color: white;">
      <h1>Hello World</h1>
      <p>Welcome to my server!</p>
    <p>second version of  my code !</p>
    </div>

</body>
</html>
`)
})

app.get('/health',async(req:Request,res:Response)=>{
    return res.status(200).json({
        message:"server is running successfully"
    })
});

const workerleadSchema = new mongoose.Schema({}, {
  strict: false,
  collection: "workerleads"
});

const WorkerLead = mongoose.model("WorkerLead", workerleadSchema);

app.get('/lead',async(req:Request,res:Response)=>{
    const response = await WorkerLead.find();
    return res.status(200).json({
        message:"worker lead finding successfully",
        data:response
    })
})

app.listen(port,async()=>{
    await connectDb();
    console.log(`server is runing on http://localhost:${port}`)
})
