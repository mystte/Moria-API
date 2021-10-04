import mongoose, { model, Model, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import IPuzzle from "../interfaces/IPuzzle";

const PuzzleSchema: Schema = new Schema({
  puzzleId: { type: String, default: () => uuidv4(), required: true },
  name: { type: String, required: true },
  data: { type: Object, required: true }
})


export const Puzzle: Model<IPuzzle> = mongoose.models.Post || model("Puzzle", PuzzleSchema);
