const express = require('express');
const app = express();
const Contact = require('../models/contact');
const Phone = require('../models/phone');
const phoneService = require('../services/phone');

//===================
//  Get phones by contact
app.get('/by-contact/:contact_id', (req, res) => {

  const { contact_id } = req.params;

  Phone
  .find({ contact: contact_id })
  .sort('name')
  .exec((err, data) => {

    if(err){
      return res.status(500).send({
        ok: false,
        error: err
      });
    }

    return res.status(200).send({
      ok: true,
      data: data
    });

  });

});

//===================
//  Add phone to contact
app.post('/', (req, res) => {

  const { contact_id, phone } = req.body;

  if(!contact_id || !phone){
    return res.status(400).send({
      ok: false,
      error: 'Invalid parameters'
    });
  }

  Contact.findById(contact_id, (err, contact) => {

    if(err){
      return res.status(500).send({
        ok: false,
        error: err
      });
    }

    if(!contact){
      return res.status(404).send({
        ok: false,
        error: 'Contact not found'
      });
    }

    phoneService
    .savePhone(contact_id, phone)
    .then(savedPhone => {
      return res.status(201).send({
        ok: true,
        data: savedPhone
      });
    })
    .catch(err => {
      return res.status(500).send({
        ok: false,
        error: err
      });
    })

  });
  
});

//===================
//  Delete phone from contact
app.delete('/:id', (req, res) => {

  const { id } = req.params;

  if(!id){
    return res.status(400).send({
      ok: false,
      error: 'Invalid parameters'
    });
  }

  console.log('DELETE PHONE ',id);

  Phone.findByIdAndRemove(id, (err, removedPhone) => {
    if(err){
      return res.status(500).send({
        ok: false,
        error: err
      });
    }

    return res.status(200).send({
      ok: true,
      data: removedPhone
    });

  });

});

//===================
//  Edit phone from contact
app.put('/:id', (req, res) => {

  const { id } = req.params;
  const { newPhone } = req.body;

  if(!id || !newPhone){
    return res.status(400).send({
      ok: false,
      error: 'Invalid parameters'
    });
  }

  Phone.findById(id, (err, phone) => {

    if(err){
      return res.status(500).send({
        ok: false,
        error: err
      });
    }

    if(!phone){
      return res.status(404).send({
        ok: false,
        error: 'Phone not found'
      });
    }
    
    phone.updateOne({
      phone_number: newPhone 
    }, (err, updatedData) => {

      if(err){
        return res.status(500).send({
          ok: false,
          error: err
        });
      }

      return res.status(200).send({
        ok: true,
        data: updatedData
      });

    });

  });
  
});


module.exports = app;