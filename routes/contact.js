const express = require('express');
const app = express();
const Contact = require('../models/contact');

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
    phones: [phone] 
  });

  contact.save((err, savedContact) => {

    if(err){
      return res.status(500).send({
        ok: false,
        error: err
      });
    }
    
    return res.status(201).send({
      ok: true,
      data: savedContact
    });

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

//===================
//  Add phone to contact
app.post('/:id/add-phone', (req, res) => {

  const { phone } = req.body;
  const { id } = req.params;

  console.log(`==> UPDATE ${ id } ${ phone }`);

  if(!id || !phone){
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
      $push: { phones: phone }
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
//  Delete phone from contact
app.delete('/:id/phone/:phone', (req, res) => {

  const { id, phone } = req.params;

  if(!id || !phone){
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
      $pull: { phones: { $in: [phone] } }
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
//  Edit phone from contact
app.put('/:id/phone/:phoneIndex', (req, res) => {

  const { id, phoneIndex } = req.params;
  const { newPhone } = req.body;

  if(!id || !phoneIndex){
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
      $set: { 
        [`phones.${ phoneIndex }`]: newPhone 
      } 
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