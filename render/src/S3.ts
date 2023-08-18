import * as AWS from 'aws-sdk'
import {throwExpression} from "./utils";
import {v4} from "uuid";

export default class S3 {
    private s3: AWS.S3;
    private bucketName: string;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.BUCKET_ACCESS_KEY_ID ?? throwExpression("Please configure BUCKET_ACCESS_KEY_ID"),
            secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY ?? throwExpression("Please configure BUCKET_SECRET_ACCESS_KEY"),
            endpoint: 'fra1.digitaloceanspaces.com'
        });
        this.bucketName = process.env.BUCKET_NAME ?? throwExpression("Please configure BUCKET_NAME")
    }

    public async upload(buffer: Buffer): Promise<string> {
        const uploadedImage = await this.s3.upload({
            Bucket: this.bucketName,
            Key: v4(),
            Body: buffer,
            ACL: 'public-read'
        }).promise();
        return uploadedImage.Location;
    }
}
