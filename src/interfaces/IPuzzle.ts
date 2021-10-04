export default interface IPuzzle extends Document {
  puzzleId: string | string[],
  name: string,
  blob: string,
}
