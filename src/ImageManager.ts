import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { Image } from "./Image";

export class ImageManager {
  private s3: S3Client | null;
  private alreadyLoaded: boolean = false;

  constructor() {
    const REGION = "ap-northeast-1";
    try {
      this.s3 = new S3Client({
        region: REGION,
        credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({ region: REGION }),
          identityPoolId: "ap-northeast-1:93c512d5-c942-4b4b-ba99-836a119d24a0", // IDENTITY_POOL_ID e.g., eu-west-1:xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx
        }),
      });
    } catch (error) {
      console.log(error);
      this.s3 = null;
    }
  }

  async getAllPhotoUrls() {
    const urls: Image[] = [];
    if (this.alreadyLoaded) {
      console.log("すでに画像はロードされているため、中断します。");
      return urls;
    }
    console.log("画像のロードを開始します...");
    if (this.s3 == null) {
      throw new Error(
        "初期化に失敗しているため、アクセスすることができません。"
      );
    }
    try {
      const data = await this.s3.send(
        new ListObjectsCommand({
          Bucket: "peuapeu",
          Prefix: "images/",
        })
      );
      const bucketUrl = "https://s3.ap-northeast-1.amazonaws.com/peuapeu/";
      for (const content of data.Contents) {
        urls[content.Key] = bucketUrl + encodeURIComponent(content.Key);
      }
    } catch (error) {
      console.log(error);
    }
    this.alreadyLoaded = true;
    return urls;
  }
}
