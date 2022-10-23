import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: String, 
    lastName: String, 
    telephoneNumber: String,
    email: String
}, {
    timestamps: true,
    collection: 'contacts'
});

export default mongoose.model('Contacts', ContactSchema);
