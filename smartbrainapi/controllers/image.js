import { ClarifaiStub, grpc } from 'clarifai-nodejs-grpc';
import db from '../db.js';

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_PAT}`);

export const handleApiCall = (req, res) => {
    const { input } = req.body;

    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": `${process.env.CLARIFAI_USER_ID}`,
                "app_id": `${process.env.CLARIFAI_APP_ID}`
            },
            model_id: "general-image-detection",
            inputs: [{ data: { image: { url: input } } }]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }

            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }

            return res.json(response);
        }
    );

};

export const handleImage = (req, res) => {
    const { id } = req.body;

    db('users').where('id', '=', id).increment('entries', 1).returning('entries').then(entries => {
        if (entries.length) {
            return res.json(entries[0].entries);
        } else {
            return res.status(400).json('No Entries Found');
        }
    }).catch(err => res.status(400).json('Error Getting Entries'));
};