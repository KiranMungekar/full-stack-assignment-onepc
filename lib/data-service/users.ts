import User from '@/lib/model/user.model'

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
        const userData = await User.findById(id);
        return userData;
    }catch(err){
        console.log('Error while fetching user for email!')
        return null;
    }
}