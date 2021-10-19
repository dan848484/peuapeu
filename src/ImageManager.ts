import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { Images } from "./Image";

type Section = "top" | "about" | "menu" | "prevention" | "payment" | "footer";

export class ImageManager {
  private s3: S3Client | null;
  private alreadyLoaded: boolean = false;
  private images: Images = {};

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

  async loadAllPhotos(forceLoad: boolean = false) {
    const images: Image = {};
    if (this.alreadyLoaded) {
      if (!forceLoad) {
        console.log("すでに画像はロードされているため、中断します。");
        return;
      }
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
        images[content.Key] = {
          url: bucketUrl + encodeURIComponent(content.Key),
        };
      }
    } catch (error) {
      console.log(error);
    }
    this.alreadyLoaded = true;
    this.images = images;
    console.log(this.images);
  }

  getImages(section: Sections): Images {
    const images: Images = {};
    let isPrevension = false;
    if (section === "prevention") {
      isPrevension = true;
    }
    for (let key in this.images) {
      if (section === key.split("/")[1]) {
        images[key.split("/")[2]] = this.images[key];
      }
    }
    return images;
  }
}
