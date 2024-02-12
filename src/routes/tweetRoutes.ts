import { Router } from 'express';

const router = Router();

// Tweet CRUD

// Create Tweet
router.post('/user', (req, res) => {
    res.status(501).json({error: 'Not Implemented'});
})

// list tweets
router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not Implemented: ${id}`});
})

// update tweet
router.put('/:id', (req, res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not Implemented: ${id}`});
})

// delete tweet
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not Implemented: ${id}`});
})

// get one tweet
router.get('/', (req, res) => {
    res.status(501).json({error: 'Not Implemented'});
})

export default router;