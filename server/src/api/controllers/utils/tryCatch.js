const tryCatch = (controller) => {
  return async (req, res) => {
    try {
      await controller(req, res)
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, messaje: `Error while login: ${error}` })
    }
  }
}
export default tryCatch
