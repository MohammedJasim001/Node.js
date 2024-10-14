import express from "express";
import { deletUser, getUser, getUserById, postUser, updateUser } from "./Controller.js";

 const router = express.Router()

router.get('/user',getUser)
router.get('/user/:id',getUserById)
router.post('/user',postUser)
router.put("/user/:id",updateUser)
router.delete('/user/:id',deletUser)

export default router