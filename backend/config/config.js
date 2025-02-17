const Joi = require("joi");
const dotenv = require("dotenv");
const path = require("path")
dotenv.config({path:path.join(__dirname, "../.env")});

const schema = Joi.object().keys({
    MONGODB_URL: Joi.string().required(),
    NODE_ENV: Joi.string().default(3000),
}).unknown()

const {value: envVars, error} = schema.prefs({errors: {label:"key"}}).validate(process.env);

if(error){
    throw new Error(error.message)
}

module.exports = {
    MONGODB_URL: envVars.MONGODB_URL,
    env: envVars.NODE_ENV
};