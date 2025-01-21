
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string,
  password: string,
  confirmPassword: string
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: false, index: true },
  lastName: { type: String, required: false },
  email: {type: String, require: true},
  password: {type: String, require: true},
  confirmPassword: {type: String, require: true}
});


const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
