/*
    Note:
    1. The "models" object is provided by the Mongoose Library and stores all the regestered models.
    2. If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable.
    3. This prevents redefining the model and ensures that the existing model is reused.
    4. If a model named "User" does not exists in the "models" object, the "model" function from Mongoose is called to create a new model.
    5. The newly created model is then assigned to the "User" variable.
*/

import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, "User Name is required"],
        // match: [/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    },
    image: {
        type: String,
    }
});

const User = models.User || model("User", UserSchema);

export default User;