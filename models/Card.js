const mongoose = require("mongoose");
const { addressSchema, imageSchema } = require("./common");
const { ref } = require("joi");

const cardSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    description: String,
    phone: String,
    email: String,
    web: String,
    image: imageSchema,
    address: addressSchema,
    bizNumber: { type:Number, unique:true },
    user_id: { type:mongoose.SchemaTypes.ObjectId, ref:'User' },
    likes: [mongoose.SchemaTypes.ObjectId],
  },
  {
    timestamps: true, //חותמת זמן ליצירה ועדכון
  }
);

  cardSchema.statics.getNextBizNumber = async function () {
    try {
      // find the highest current biznumber in our cards collection
      const found = await Card.find({}).sort([["bizNumber",-1]]).limit(1).exec();
      // not found (empty collection), so return 1 as next bizNumber
      if (found.length===0) return 1
      // found
      const nextBizNumber = found[0].bizNumber + 1;
      return nextBizNumber;
    } catch(err) {
      throw err
    }
  }
    
  const bizNumberSchema = new mongoose.Schema({
    bizNumber: { type: Number, unique: true, required: true },
  });

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
