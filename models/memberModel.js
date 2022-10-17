import { Schema, model, models } from "mongoose";

const memberSchema = new Schema({
  name: String,
  personal: String,
  birth: String,
  badge: String,
  card: String,
  register: String,
  avatar: String,
  userId: String,
  cardFrontSide: String,
  cardBackSide: String,
});

const Member = models.Member || model("Member", memberSchema);

export default Member;
