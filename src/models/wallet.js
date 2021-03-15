import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const WalletSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "clients" },
  address: String,
  value: { type: Number, default: 0 },
  history: [
    {
      historyid: String,
      date: Date,
      value: Number,
      operation: { type: String, enum: ["pay", "recharge"] },
    },
  ],
});

WalletSchema.pre("save", function () {
  if (this.isNew) this._doc.address = uuidv4();
});

export default model("wallets", WalletSchema);
