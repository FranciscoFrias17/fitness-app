import mongoose, { Schema, model, Types } from 'mongoose'

interface ISet {
    exerciseId: mongoose.Types.ObjectId
    exerciseName: string
    exerciseDescription: string
    sets: Types.ObjectId
    weight: number
    weightType: string
    userId: mongoose.Types.ObjectId
}

const setSchema = new Schema<ISet>(
    {
        exerciseId: {
            type: Types.ObjectId,
            required: true,
            unique: true,
        },
        exerciseName: {
            type: String,
            required: true,
        },
        exerciseDescription: {
            type: String,
            required: true,
        },
        sets: {
            type: Types.ObjectId,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        weightType: {
            type: String,
            required: true,
        },
        userId: {
            type: Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default model<ISet>('Set', setSchema)
