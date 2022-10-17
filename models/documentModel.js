import { Schema, model, models } from "mongoose";

const documentSchema = new Schema({
  name: String,
  url: String,
});

const Document = models.Document || model("Document", documentSchema);

export default Document;
