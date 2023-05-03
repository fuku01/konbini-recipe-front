import { S3 } from "aws-sdk";
import { DeleteObjectRequest, PutObjectRequest } from "aws-sdk/clients/s3";

// S3の設定
const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
  });

  const useS3 = () => {

    // 【アップロード】S3に画像をアップロードし、そのURLを取得する関数
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

    try {
      // S3に画像をアップロードする
      const data = await s3.upload(params).promise();
      // アップロード成功時の処理
      console.log('S3へ画像アップロード成功:', data.Location);
      // アップロードされた画像のURLを取得
      return data.Location;
    } catch (error) {
      // アップロードエラー発生時の処理
      console.error('S3へ画像アップロードエラー:', error);
      // null値を返す
      return null;
    }
    };

// 【削除】S3から画像を削除する関数
const deleteImageFromS3 = async (url: string) => {
  // URLからバケット名とキーを取得
  const urlObject = new URL(url);
  const key = urlObject.pathname.slice(1);
  // 削除時の情報をまとめるオブジェクト
  const params: DeleteObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME ? process.env.S3_BUCKET_NAME : '',
    Key: key,
  };

  try {
    // S3から画像を削除する
    await s3.deleteObject(params).promise();
    // 削除成功時の処理
    console.log('S3の画像削除成功');
  } catch (error) {
    // 削除エラー発生時の処理
    console.error('S3の画像削除エラー:', error);
  }
};


  return { uploadImageToS3, deleteImageFromS3 };
};
    export default useS3;