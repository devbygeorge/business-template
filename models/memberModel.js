import { Schema, model, models } from "mongoose";

const memberSchema = new Schema({
  name: String,
  email: String,
});

const Member = models.Member || model("Member", memberSchema);

export default Member;
