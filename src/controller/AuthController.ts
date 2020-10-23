import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export  class AuthController {
    static login = async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body

        if (!(username && password)) return res.status(400).json({ message: 'El usuario y contraseña son requerida'})
        // TODO: Desarrollar el login
        const userRepository = getRepository(User)
        let user = new User()
        try {
            user = await userRepository.findOneOrFail({
                where: { username }
            })
        } catch (error) {
            return res.status(400).json({ message: `Los datos son incorredtos`})
        }
        res.send(user)
    }
}