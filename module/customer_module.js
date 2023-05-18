const mongoose = require("mongoose");

const customers_schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter customer -> employee name"],
    },
    address: {
      type: String,
      required: [true, "please input customer -> employee adress"],
    },
    birth_date: {
      type: Date,
      required: [true, "please input customer -> employee birth date"],
    },
  },
  { timestamps: true } //record if theres any changes
);

const Customers = mongoose.model("Customers", customers_schema);

module.exports = Customers;
