import Cloud from "@google-cloud/storage";
import path from "path"
const serviceKey = path.join(__dirname, '../keys/portfolio-318500-6de088980f9f.json')

const { Storage } = Cloud
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: process.env.GCP_PROJECT,
});

export default storage;