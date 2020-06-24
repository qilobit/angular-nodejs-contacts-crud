const Phone = require('../models/phone');

function savePhone(contactId, phone){

  return new Promise((resolve, reject) => {
    const newPhone = new Phone({
      contact: contactId,
      phone_number: phone
    });

    newPhone.save((err, savedPhone) => {
      if(err){
        reject(err);
      }else{
        resolve(savedPhone);
      }
    });
  });  
}

module.exports = {
  savePhone
}