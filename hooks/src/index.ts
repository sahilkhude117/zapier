import express from 'express';
import { PrismaClient } from '@prisma/client';
const app = express();

const prisma = new PrismaClient();
app.use(express.json());

app.post("/hooks/catch/:userId/:zapId",async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    // store in db a new trigger 
    await prisma.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data : {
                zapId: zapId,
                metaData: body
            }
        });

        await tx.zapRunOutbox.create({
            data : {
                zapRunId: run.id
            }
        })
    })
    // push to queue kafka or redis

    res.json({
        msg : "Webhook received"
    })
})

app.get("/",(req,res) => {
    res.json({
        msg:"hii there"
    })
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});