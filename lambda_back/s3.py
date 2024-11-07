import boto3
import logging
from botocore.exceptions import ClientError
import urllib
import base64
import botocore

bucket_name = "bucket_name"

s3 = boto3.client(
    's3',
    region_name="ap-northeast-2",
    aws_access_key_id="aws_access_key_id",
    aws_secret_access_key="aws_secret_access_key",
)


def create_presigned_url(object_name, expiration=3600):
    # Generate a presigned URL for the S3 object
    safe_filename = urllib.parse.quote(object_name.split('/')[-1].encode('utf8'))
    content_disposition = f'attachment; filename="{safe_filename}"'
    try:
        return s3.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name,
                                                            'ResponseContentDisposition': content_disposition},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None


def download_file(filePath: str):
    destination_path = "/tmp/output" + filePath
    try:
        s3.download_file(bucket_name, filePath, destination_path)
        with open(destination_path, "rb") as file:
            encoded_string = base64.b64encode(file.read()).decode("utf-8")
        return encoded_string
    except (botocore.exceptions.ClientError, IOError) as error:
        print(f"Error downloading file: {error}")
