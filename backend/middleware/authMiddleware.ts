import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { Request, Response, NextFunction } from 'express'

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

            // Get user from token
            req.user = await User.findById((decoded as any).id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
