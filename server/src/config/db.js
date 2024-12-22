import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log(`Successfully connected to DB 😃`)
  } catch (error) {
    console.log(`Error occurred while connecting to DB: ${error}`)
  }
}
// export default { connectDB }
export default connectDB
