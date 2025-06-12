import express from 'express';
import { createUsers, deleteUser, getUserByName, getUsers, getUsersById, updateUser } from '../controllers/UserController.js';


const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUsers);
router.get("/users/:id", getUsersById); 
router.get("/users/:name", getUserByName); 
router.patch("/users/:id", updateUser); 
router.delete("/users/:id", deleteUser); 

export default router;
// The code above defines a route for getting all users. The route uses the getUsers function from the UserController as the handler.
//  