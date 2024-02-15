import { Router } from 'express';
import { PrismaClient } from '@prisma/client'


const router = Router();
const prisma = new PrismaClient();
// Tweet CRUD

// Create Tweet
router.post('/', async (req, res) => {
    const {content, image} = req.body;
    // @ts-ignore
    const user = req.user;

    try{
        const result = await prisma.tweet.create({
            data:{
                content,
                image,
                userId: user.id,
            },
            include: {user:true}
        })
        res.json(result);
    }
    catch(e){
        res.status(500).json({error: "Wrong input"});
    }
})

// get one tweet
router.get('/:id', async (req, res) => {
    const {id} = req.params;

    const tweet = await prisma.tweet.findUnique({
        where: {id: Number(id)},
        include:{
            user:true,
        }
    })
    if(!tweet){
        res.status(404).send({error: "Not Found"})
    }

    res.json(tweet);
})

// update tweet
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {content, image} = req.body;
    try {
        const result = await prisma.tweet.update({
            where: {id: Number(id)},
            data: {
                content,
                image
            }
        })
        res.json(result);
    }
    catch (e) {
        res.status(400).json({error: `Failed to update the tweet`});
    }
})

// delete tweet
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const result = await prisma.tweet.delete({where: {id: Number(id)}})
    res.json(result);
})

// list tweets
router.get('/', async (req, res) => {
    console.log("tweet request")
    const allTweets = await prisma.tweet.findMany({
        include:{
            user:{
                select:{
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                }
            }
        }
    });
    res.json(allTweets);

})

export default router;