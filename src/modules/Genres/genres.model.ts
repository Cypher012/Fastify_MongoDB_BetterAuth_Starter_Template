import { Schema, model, Types } from 'mongoose';


interface IGenre {
    name: string;
}

const genreSchema = new Schema<IGenre>({
    name: { type: String, required: true, unique: true },
}, {timestamps: true});

const Genre = model<IGenre>("Genre", genreSchema);

export default Genre;