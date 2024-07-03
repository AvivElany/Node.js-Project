const Joi = require('joi');

const validationOptions = {
  stripUnknown:true,
  abortEarly:false,
}

const schemas = {
  createNewCard:
    Joi.object().keys({
      title: Joi.string().required(),
      subtitle: Joi.string().required(),
      description: Joi.string().optional(),
      phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'cellphone number'}).required(),
      email: Joi.string().email().required(),
      web: Joi.string().uri().required(),
      image: Joi.object().keys({
        url: Joi.string().required(),
        alt: Joi.string().optional(),
      }),
      address: Joi.object().keys({
        state: Joi.string().required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().required(),
        zip: Joi.string().required(),
      }),
      likes: Joi.object({
        userId: Joi.string().required()
      })
    }).options(validationOptions),
  
  updateCard:
  Joi.object().keys({
    title: Joi.string().optional(),
    subtitle: Joi.string().optional(),
    description: Joi.string().optional(),
    phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'cellphone number'}).optional(),
    email: Joi.string().email().optional(),
    web: Joi.string().uri().optional(),
    image: Joi.object().keys({
      url: Joi.string().optional(),
      alt: Joi.string().optional(),
    }),
    address: Joi.object().keys({
      state: Joi.string().optional(),
      country: Joi.string().optional(),
      city: Joi.string().optional(),
      street: Joi.string().optional(),
      houseNumber: Joi.number().optional(),
      zip: Joi.string().optional(),
    }),
      likes: Joi.object({
        userId: Joi.string().required()
      })
  }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"),
  
  searchCard: Joi.object().keys({
    searchTerm: Joi.string().min(3).max(30).required(),
    searchFields: Joi.array()
      .items(Joi.string().valid("title", "subtitle", "description"))  // Important! allow to search only these fields. This way we can prevent search in "private" fields
      .min(1)
      .required(),
  }).options(validationOptions),
}

module.exports = schemas;