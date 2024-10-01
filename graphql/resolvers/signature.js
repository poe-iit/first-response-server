// Define a 'Signature' class to encapsulate signature-related operations and data
class Signature{
  constructor({signature, timeStamp}, context){
    if(!context?.isAuth) throw new Error("Error retrieving Signature data. You are not authenticated.")
    this.context = context
    this.signature = signature
    this.timeStamp = timeStamp
  }
}

// Export the Signature class for use in other parts of the application
module.exports = Signature