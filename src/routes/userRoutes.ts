import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
// User CRUD

// Create user
router.post('/', async (req, res) => {
    const { email, name, username } = req.body;
    console.log(email, name, username);

    try {
        const result = await prisma.user.create({
            data: {
                email,
                name,
                username,
                bio: "Hello, I'm new on Twitter",
            }
        })

        res.json(result);
    }
    catch (e){
        res.status(400).json({ error: "Username and email should be unique"});
    }
})

// get user
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const user = await prisma.user.findUnique({
        where: {id: Number(id)},
        include:{ tweets: true }
    })
    if(!user){
        res.status(404).send({error: "Not Found"})
    }

    res.json(user);
})

// update user
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {bio, name, image} = req.body;

    try{
        const result = await prisma.user.update({
            where: { id: Number(id) },
            data:{
                bio,
                name,
                image,
            }
        })
        res.json(result);
    }
    catch (e) {
        res.status(400).json({error: `Failed to update the user`});
    }
})

// delete user
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    await prisma.user.delete({where: {id: Number(id)}});

    res.status(200);
})

// list users
router.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany({select: {id: true, name: true, image: true}});
    res.json(allUsers);
})

export default router;