
const bcrypt = require('bcryptjs');

 

const encrypt = async function(plainText){
  console.log('Utils.encrypt, plainText = ', plainText);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plainText, salt)
  console.log('Utils.encrypt, hash = ', hash);
  return(hash);
}

// compares plainText against the saved hash, returns "true" if plainText matches 
const compareWithHash = async function(plainText, hash){ 
  console.log(`Utils.compareWithHash, plainText = ${plainText}, hash=${hash}`);
  isMatch = await bcrypt.compare(plainText, hash); 
  return (isMatch); 
}


module.exports = {
  "encrypt" : encrypt, 
  "compareWithHash" : compareWithHash
}