import mongoose, { model, Model, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import ILevel from "../interfaces/ILevel";

const LevelSchema: Schema = new Schema({
  levelId: { type: String, default: () => uuidv4() },
  name: { type: String, required: true, maxlength: 30 },
  mineMapGridObjectArray: { type: Array, required: true }
})


export const Level: Model<ILevel> = mongoose.models.Post || model("Level", LevelSchema);
