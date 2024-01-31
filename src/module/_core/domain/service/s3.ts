import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import * as AWS from "aws-sdk";
import { DeleteObjectRequest, PutObjectRequest } from "aws-sdk/clients/s3";
import {
  ConfigEnvHelper,
  ConfigEnvType,
} from "../../infras/env/configEnv.helper";
import { ClientExeption } from "../../infras/exception/clientException";

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor(
    @Inject(ConfigEnvHelper.getServiceName())
    private readonly configService: ConfigType<ConfigEnvType>
  ) {
    this.s3 = new AWS.S3({
      endpoint: configService.s3Endpoint,
      accessKeyId: configService.s3AccessKey,
      secretAccessKey: configService.s3KeySecret,
    });
  }

  async uploadFile(file: Express.Multer.File, path: string) {
    const params: PutObjectRequest = {
      Bucket: this.configService.s3Bucket,
      Key: path,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
      ContentDisposition: "inline",
    };

    try {
      const s3Response = await this.s3.upload(params).promise();

      return {
        relativePath: s3Response.Key,
        absolutePath: s3Response.Location,
      };
    } catch (e) {
      throw new ClientExeption("Đã có lỗi xảy ra khi upload file !");
    }
  }

  async delete(path: string) {
    const params: DeleteObjectRequest = {
      Bucket: this.configService.s3Bucket,
      Key: path,
    };

    await this.s3.deleteObject(params).promise();
  }

  async deleteFolder(path: string) {
    const listParams = {
      Bucket: this.configService.s3Bucket,
      Prefix: path,
    };

    const listedObjects = await this.s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
      Bucket: this.configService.s3Bucket,
      Delete: { Objects: [] },
    };

    listedObjects.Contents.forEach(({ Key }) => {
      deleteParams.Delete.Objects.push({ Key });
    });

    await this.s3.deleteObjects(deleteParams).promise();

    if (listedObjects.IsTruncated) await this.deleteFolder(path);
  }
}
