const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

//create a configuration
const config = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

//config response generation
const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
};

//initialize our model
const model = config.getGenerativeModel({ model: process.env.MODEL_ID , generationConfig });

module.exports = model;