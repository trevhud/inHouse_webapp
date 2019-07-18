const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Sites = new Schema({
  sites_name: {
    type: String
  },
  sites_location: {
    type: String
  },
  sites_createdat: {
    type: Date
  },
  sites_updatedat: {
    type: Date
  }
});

let Stacks = new Schema({
  stack_createdat: {
    type: Date
  },
  stack_sitesystemid: { type: Schema.Types.ObjectId, ref: "Sitesystems" }
});

let Sitesystems = new Schema({
  sitesystem_siteid: { type: Schema.Types.ObjectId, ref: "Sites" },
  sitesystem_createdat: {
    type: Date
  },
  sitesystem_updatedat: {
    type: Date
  },
  sitesystem_ph: {
    type: String
  },
  sitesystem_ec: { type: String },
  sitesystem_temp: { type: String },
  sitesystem_humidity: { type: String },
  sitesystem_dissolved_oxygen: { type: String },
  sitesystem_co2: { type: String }
});

let Modules = new Schema({
  module_cropname: {
    type: String
  },
  module_imageurl: {
    type: String
  },
  module_cameranum: {
    type: String
  },
  module_updatedat: {
    type: Date
  },
  module_createdat: {
    type: Date
  },
  module_stackid: { type: Schema.Types.ObjectId, ref: "Stacks" }
});

module.exports = {
  Sites: mongoose.model("Sites", Sites),
  Sitesystems: mongoose.model("Sitesystem", Sitesystems),
  Stacks: mongoose.model("Stacks", Stacks),
  Modules: mongoose.model("Modules", Modules)
};
