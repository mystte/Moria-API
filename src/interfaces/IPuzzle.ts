export default interface IPuzzle extends Document {
  puzzleId: string | string[],
  name: string,
  mineMapGridObjectArray: Array<Object>,
  openingObjectArray: Array<Object>,
}
