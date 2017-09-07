// Importing Node packages required for schema
const mongoose = require("mongoose");
const ROLE_MEMBER = require("../../config/constants").ROLE_MEMBER;
const ROLE_CLIENT = require("../../config/constants").ROLE_CLIENT;
const ROLE_OWNER = require("../../config/constants").ROLE_OWNER;
const ROLE_ADMIN = require("../../config/constants").ROLE_ADMIN;

const Schema = mongoose.Schema;

const ShelterSchema = new Schema(
    {
        nameOfShelter: {
            type: String,
            required: true
        },
        locationOfShelter: {
            type: String,
            required: true
        },
        postedBy: {
            type: String,
            lowercase: true,
            required: true
        },
        occupants: { type: Number },
        volunteers: { type: Number },
        description: { type: String },
        shelter: { type: String }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Shelter", ShelterSchema);