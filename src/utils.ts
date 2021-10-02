
import { connect, ConnectOptions } from "mongoose"
const { MONGODB_URI } = process.env;

const options: ConnectOptions = {}

export const connectToDatabase = () => connect(MONGODB_URI, options)
