export default interface ILevel extends Document {
  levelId: string | string[],
  name: string,
  mineMapGridObjectArray : Array<Object>,
}
