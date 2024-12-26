const tryCatch = (controller) => {
  return async (req, res) => {
    try {
      await controller(req, res)
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, messaje: `Error: ${error}` })
    }
  }
}
export default tryCatch
