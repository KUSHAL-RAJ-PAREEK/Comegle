"use server"

import db from "@repo/db/client";
import {v4 as uuidv4} from "uuid";


export async function saveUser(email: string, name: string, token?: string | null,
                               image?: string | null,
                               status?: string | null) {

    try {
        const existingUser = await db.user.findUnique({
            where: {email},
        });

        if (existingUser) {
            const updatedUser = await db.user.update({
                where: {email},
                data: {
                    name,
                    image,
                    token,
                    emailVerified: new Date(),
                },
            });

            return {success: true, user: updatedUser};
        }

        const domain = email.split("@")[1] as string;

        let pool = await db.pool.findUnique({
            where: {domain},
        });

        if (!pool) {
            const newPoolId = uuidv4();
            pool = await db.pool.create({
                data: {
                    domain,
                    poolId: newPoolId,
                },
            });
        }

        const newUser = await db.user.create({
            data: {
                email,
                name,
                image,
                token,
                emailVerified: new Date(),
                createdAt: new Date(),
                poolId: pool.poolId,
            },
        });

        return {success: true, user: newUser};

    } catch (error: any) {
        console.log("Error saving user " + error);
        return {success: false, error: error.message}
    }
}