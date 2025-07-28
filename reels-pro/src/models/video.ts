import mongoose, {Schema} from "mongoose";

export const VIDEO_DIMENSIONS = {
    width: 1280,
    height: 1920,
} as const

export interface IVideo {
    _id?: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    transformation?: {
        height: number,
        width: number,
        quality?: number,
    }
}

const videoSchema = new Schema<IVideo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, required: true },
    transformation: {
        height: { type: Number, default: VIDEO_DIMENSIONS.height },
        width: { type: Number, default: VIDEO_DIMENSIONS.width },
        quality: { type: String, min: 1, max:100 },
    }
},{ timestamps: true }) 

const Video = mongoose.models?.Video || mongoose.model<IVideo>("Video",videoSchema) 

export default Video;