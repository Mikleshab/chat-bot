import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class SecretsService {
  private readonly logger = new Logger(SecretsService.name);
  private secretsManager: AWS.SecretsManager;

  constructor() {
    this.secretsManager = new AWS.SecretsManager({
      region: 'ap-southeast-1',
    });
  }

  async getSecret(secretId: string): Promise<any> {
    try {
      const data = await this.secretsManager.getSecretValue({ SecretId: secretId }).promise();

      if (data.SecretString) {
        const secret = JSON.parse(data.SecretString);
        this.logger.log('Secret fetched successfully');
        return secret;
      } else {
        this.logger.error('SecretString is empty');
      }
    } catch (error) {
      this.logger.error(`Error fetching secret: ${error.message}`);
      throw error;
    }
  }
}
