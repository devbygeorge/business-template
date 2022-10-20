import { Schema, model, models } from "mongoose";

const documentsSchema = new Schema({
  data: [{ name: String, url: String }],
});

const Documents = models.Documents || model("Documents", documentsSchema);

export default Documents;
