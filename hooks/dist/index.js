"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.post("/hooks/catch/:userId/:zapId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    // store in db a new trigger 
    yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const run = yield prisma.zapRun.create({
            data: {
                zapId: zapId,
                metaData: body
            }
        });
        yield prisma.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        });
    }));
    // push to queue kafka or redis
    res.json({
        msg: "Webhook received"
    });
}));
app.get("/", (req, res) => {
    res.json({
        msg: "hii there"
    });
});
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
