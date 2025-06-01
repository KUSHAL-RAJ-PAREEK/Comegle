"use server"

// @ts-ignore
import db from "@repo/db/client";

export async function saveUser(email : string, name:string,  token?: string | null,
                               image?: string | null,
                               status?: string | null){

    try{
        const user = await db.user.upsert({
            where: {
                email: email,
            },
            update: {
                name: name,
                image: image,
                token: token,
                emailVerified: new Date(),
            },
            create: {
                email: email,
                name: name,
                image: image,
                token: token,
                emailVerified: new Date(),
                createdAt: new Date(),
            }
        });

        console.log(user)
        return {success : true,user}
    }catch (error:any){
        console.log("Error saving user "+ error);
        return {success : false,error : error.message}
    }
}