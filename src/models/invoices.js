import { model, Schema } from "mongoose";

const InvoicesSchema = new Schema({
  wallet: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

export default model("invoices", InvoicesSchema);
