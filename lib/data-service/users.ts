import User from '@/lib/model/user.model'
import { v4 as uuidv4 } from 'uuid';

export const getUserByEmail = async (email: string) => {
    try{
        const userData = await User.findOne({ email: email });
        return userData;
    }catch(err){
        console.log('Error while fetching user for email!')
        return null;
    }
}



export const getUserById = async (id: string) => {
    try{
        const userData = await User.findOne({id : id});
        return userData;
    }catch(err){
        console.log('Error while fetching user for id!')
        return null;
    }
}

export const createNewUser = async (email: string, name: string) => {
    const existingUser:any = await getUserByEmail(email);

    if(existingUser){
        console.log("EmailId already exists! ")
        return;
    }

    //Create a User
    const newUser = await User.create({
        id: uuidv4(), 
        email,
        name: name,
    })

    return newUser;
}