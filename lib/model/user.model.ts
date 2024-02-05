import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {type: String, require: true, unique: true},
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String},
    image: {type: String},
    accounts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account'
        }
    ]

});

const User = mongoose.models?.User || mongoose.model('User', userSchema);

export default User;