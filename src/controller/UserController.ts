import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from "class-validator";

export class UserController {

    static getAll= async (req: Request, res: Response, next: NextFunction) => {
        const userRepository = getRepository(User)
        const data = await userRepository.find()
        if (data.length > 0) {
            res.send(data)            
        } else {
            res.status(404).json({ message: 'No encontrado'})
        }
    }

    static getByid = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const userRepository = getRepository(User)
        try {
            const data = await userRepository.findOneOrFail(id)
           res.send(data) 
        } catch (e) {
            res.status(404).json({ message: 'El usuario no exist'})
        }
    }

    static newUser = async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password, role } = req.body
        const user = new User()
        user.username = username
        user.password = password
        user.email = email
        user.role = role

        //Validate
        const errors = await validate(user)
        if (errors.length > 0) {
            return res.status(400).json(errors)
        }

        // TODO: Hash password
        const userRepository = getRepository(User)
        const data = await userRepository.save(user)
        try {
             data
        } catch (e) {
            return res.status(409).json({ message: 'Username o Email existen'})
        }
        res.status(201).json({
            message: 'Usuario creado',
            data
        })
    }
    static editUser = async (req: Request, res: Response, next: NextFunction) => {
        let user
        const { id } = req.params
        const { name, lastName, username, email, role } = req.body
        const userRepository = getRepository(User)
        try {
            user = await userRepository.findOneOrFail(id)
            user.name = name
            user.lastName = lastName
            user.username = username
            user.email = email
            user.role = role
        } catch (e) {
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        const errors = await validate(user)
        if (errors.length > 0) {
            return res.status(400).json(errors)
        }
        const data = await userRepository.save(user)
        try {
            data
        } catch (error) {
            return res.status(409).json({ message: 'Username o Email existen'})
        }
        res.status(201).json({message: 'Usuario actualizado correctamente', data})
    }

    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const userRepository = getRepository(User)
        let user: User
        try {
            user = await userRepository.findOneOrFail(id)
        } catch (error) {
            return res.status(404).json({ message: 'Usuario no encontrado'})
        }
        userRepository.delete(id)
        res.status(201).json({ message: 'Usuario ha sido eliminado correctamente'})
    }

}