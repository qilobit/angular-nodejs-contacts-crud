const express = require('express');
const app = express();
const Contact = require('../models/contact');
const phoneService = require('../services/phone');

//===================
//  Get all contact
app.get('/', (req, res) => {

  Contact
  .find({})
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
//  Create contact
app.post('/', (req, res) => {

  const { name, phone } = req.body;

  if(!name || !phone){
    return res.status(400).send({
      ok: false,
      error: 'Invalid parameters'
    });
  }

  const contact = new Contact({
    name: name,
  });

  contact.save((err, savedContact) => {

    if(err){
      return res.status(500).send({
        ok: false,
        error: err
      });
    }
    
    phoneService
    .savePhone(savedContact._id, phone)
    .then(savedPhone => {
      return res.status(201).send({
        ok: true,
        data: savedContact
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
//  Update contact
app.put('/:id', (req, res) => {

  const { name } = req.body;
  const { id } = req.params;

  if(!name){
    return res.status(400).send({
      ok: false,
      error: 'Invalid parameters'
    });
  }

  Contact.findById(id, (err, contact) => {

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
    
    contact.updateOne({
      name: name
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

//===================
//  Delete contact
app.delete('/:id', (req, res) => {

  const { id } = req.params;

  if(!id){
    return res.status(400).send({
      ok: false,
      error: 'Invalid parameters'
    });
  }

  Contact.findByIdAndRemove(id, (err, deletedContact) => {
    if(err){
      return res.status(500).send({
        ok: false,
        error: err
      });
    }
    
    return res.status(200).send({
      ok: true,
      deletedContact: deletedContact
    });
  });
  
});

module.exports = app;