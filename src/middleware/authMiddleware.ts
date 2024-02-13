
import {Request, Response, NextFunction} from "express";
import { PrismaClient, User } from "@prisma/client";
// @ts-ignore
import jwt from "jsonwebtoken";

const JWT_SECRET :string ="SUPER SECRET";
const prisma = new PrismaClient();

type AuthRequest = Request & {user?: User}

export async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const jwttoken = authHeader.split(' ')[1];

    try{
        const payload = await jwt.verify(jwttoken, JWT_SECRET) as {tokenId: number};
        const dbToken = await prisma.token.findUnique({
            where:{id: payload.tokenId},
            include: {user:true},
        })

        if(!dbToken?.valid || dbToken.expiration < new Date()){
            return res.status(401).json({error: "API token not valid"});
        }
        req.user = dbToken.user;

    } catch (e) {
        return res.sendStatus(401);
    }

    next();
}