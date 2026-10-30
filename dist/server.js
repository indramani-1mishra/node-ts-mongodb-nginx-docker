import express from 'express';
import 'dotenv/config';
import { connectDb } from './dbConfig.js';
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT || 3002;
app.get('/', (req, res) => {
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
    </div>

</body>
</html>
`);
});
const workerleadSchema = new mongoose.Schema({}, {
    strict: false,
    collection: "workerleads"
});
const WorkerLead = mongoose.model("WorkerLead", workerleadSchema);
app.get('/lead', async (req, res) => {
    const response = await WorkerLead.find();
    return res.status(200).json({
        message: "worker lead finding successfully",
        data: response
    });
});
app.listen(port, async () => {
    await connectDb();
    console.log(`server is runing on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map