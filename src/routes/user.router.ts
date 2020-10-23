import { Router } from 'express'
import { UserController } from '../controller/UserController'

const router = Router()
// Get all user
router.get('/', UserController.getAll)

// Get one user
router.get('/:id', UserController.getByid)

// Create a new user
router.post('/', UserController.newUser)

// Edit one user by id
router.patch('/:id', UserController.editUser)

//Delete one user by id
router.delete('/:id', UserController.deleteUser)

export default router