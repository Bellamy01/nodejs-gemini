const path = require('path');
const model = require('../models/geminiModel');

const fs = require('fs');

const responsePath = path.join(__dirname, '../data/responses.json');

exports.welcome = async (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to our NODE_JS/GEMINI Application'
    });
};

exports.viewAllResponses = async (req, res) => {
    try {
        fs.readFile(responsePath, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    status: 'fail',
                    message: 'Something went wrong!'
                });
                return; // Exit the function on error
            }

            const responses = JSON.parse(data);
            res.status(200).json({
                status: 'success',
                message: 'Retrieved responses successfully',
                data: {
                    responses
                }
            })
        });
    }
    catch (err) {
        console.log('Error', err);
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong!'
        })
    }
};

exports.generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        //Build the response data
        const responseData = {
            prompt,
            response: text,
            timestamp: Date.now(),
        };

        fs.appendFile(responsePath, JSON.stringify(responseData, null, 2), (err) => {
            if (err) {
                console.log('Error', err);
                res.status(500).json({ status: 'fail', message: 'Unable to save response data!' });
            } else {
                console.log('Response saved successfully');
            }
        });

        res.send({
            status: 'success', message: 'Response generated successfully', data: {
                response: text
            }
        });
    }
    catch (err) {
        console.log('Error', err);
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong!'
        })
    }
};