import { S3 } from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";

// S3の設定
const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
  });

  const useS3 = () => {
    // S3に画像をアップロードし、そのURLを取得する関数
    const uploadImageToS3 = async (file: File) => {
    // アップロード時のファイル名を作成
    const fileName = `${Date.now()}-${file.name}`;
    // S3へのアップロードに必要な情報をまとめるオブジェクト
    const params: PutObjectRequest = {
      Bucket: process.env.S3_BUCKET_NAME ? process.env.S3_BUCKET_NAME : '',
      Key: fileName,
      ContentType: file.type,
      Body: file,
    };
    // Bucket: アップロード先のバケット名を環境変数から取得します。
    // Key: アップロードするファイルのキーを指定します。
    // ContentType: アップロードするファイルのMIMEタイプを指定します。
    // Body: アップロードするファイルデータを指定します。

    try {
      // S3に画像をアップロードする
      const data = await s3.upload(params).promise();
      // アップロード成功時の処理
      console.log('画像アップロード成功:', data.Location);
      // アップロードされた画像のURLを取得
      return data.Location;
    } catch (error) {
      // アップロードエラー発生時の処理
      console.error('画像アップロードエラー:', error);
      // null値を返す
      return null;
    }
    };
  return { uploadImageToS3 };
};
    export default useS3;