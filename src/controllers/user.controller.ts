import { Request, Response } from 'express';
import { UserServices } from '../services';

class UserController {
    /**
     * GET /users
     * @param _req 
     * @param res 
     */
    public getUsers(_req: Request, res: Response): void {
        try {
            const userService = new UserServices();
            const users = userService.getUsers();
            res.status(200).send(users);

        } catch (error: Error | any) {
            res.status(500).send(error.message);
        }
    }
}

export default UserController;