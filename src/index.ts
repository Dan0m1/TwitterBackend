// @ts-ignore
import express from 'express';
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import authRoutes from "./routes/authRoutes";
import { authenticateToken } from "./middleware/authMiddleware";

const app = express();
app.use(express.json());
app.use('/user', authenticateToken, userRoutes);
app.use('/tweet', authenticateToken, tweetRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("Hello world");
});


app.listen(3300, () => {
    console.log("Server ready at localhost:3300")
});