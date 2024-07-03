const schemas = require("../schemas/cardsSchema");
const Card = require("../models/Card");

const getAllCards = async (req, res) => {
  // get all cards
  try {
    const allCards = await Card.find({});
    // return all cards
    return res.status(200).json({
      success: true,
      data: allCards,
    });
  } catch (err) {
    // return an error message
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getCardById = async (req, res) => {
  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;

  try {
    // find the card that matches this id
    const found = await Card.findById(id).populate('user_id').exec();
    // found
    if (found) {
      // return the card found
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    // not found
    return res.status(404).json({
      success: false,
      message: `card id '${id}' not found`,
    });
  } catch (err) {
    // return an error message
    return res.status(400).json({
      success: false,
      message: "Invalid format for card id",
    });
  }
};

const createNewCard = async (req, res) => {

  // validate the request's body using joi
  const { error, value } = schemas.createNewCard.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // create a new Card instance (it's only in memory- until we actually save it)
  const newCard = new Card(value);

  // generate & assign the nextBizNumber to the new card
  newCard.bizNumber = await Card.getNextBizNumber();

  // save the card to database
  try {
    const saved = await newCard.save();
    // success ! return a response
    return res.status(201).json({
      success: true,
      created: saved,
    });
  } catch (err) {
    // error
    return res
      .status(500)
      .json({ success: false, message: `error saving the card` });
  }
};

const deleteCard = async (req, res) => {

  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;
  // try to handle errors
  try {
    const deleted = await Card.findByIdAndDelete(id);
    if (!deleted) throw new Error();
    // found & deleted
    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `card id ${id} not found` });
  }
};

const updateCard = async (req, res) => {
  
  // validate the request's body using joi
  const { error, value } = schemas.updateCard.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;

  let updated;

  try {
    updated = await Card.findByIdAndUpdate(id, value, { new: true });
    // not found- return a response and stop execution
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: `card id ${id} was not found.` });
    // found- return a response
    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `card id ${id} was not found.` });
  }
};

const likeCard = async (req, res) => {
  try {

    const { cardId } = req.params;
    const { id } = req.user;

    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).send('Card not found');
    }

    const userIndex = card.likes.indexOf(id);
    if (userIndex === -1) {
      // User has not liked the card yet, add them to likes
      card.likes.push(id);
    } else {
      // User has already liked the card, remove them from likes
      card.likes.splice(userIndex, 1);
    }

    await card.save();

    res.status(200).json({
        success: true,
        card: card,
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const changeBizNumber = async (req, res) => {
  const { cardId } = req.params;
  const { bizNumber } = req.body;

  try {
    // check id biz number is exist
    const existingCard = await Card.findOne({ bizNumber });
    if (existingCard) {
      return res.status(400).json({ message: 'BizNumber already in use' });
    }

    // update new biz number
    const card = await Card.findByIdAndUpdate(cardId, { bizNumber }, { new: true });
    if (!card) {
      return res.status(404).json({success: false, message: 'Card not found' });
    }

    res.status(200).json({success: true, "fixed card": card});
  } catch (error) {
    res.status(500).json({success: false, message: 'Server error', error });
  }
}

module.exports = {
  getAllCards,
  getCardById,
  createNewCard,
  deleteCard,
  updateCard,
  likeCard,
  changeBizNumber,
};
