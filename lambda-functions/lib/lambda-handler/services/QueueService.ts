import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import pino from 'pino';

const logger = pino();
export class QueueService {
  private sqs = new SQSClient({});
  constructor(private queueUrl: string) {}

  async sendMessage(message: any): Promise<void> {
    try {
      const command = new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: JSON.stringify(message),
      });
      await this.sqs.send(command);
      logger.info({ queueUrl: this.queueUrl }, 'Message sent successfully');
    } catch (error) {
      logger.error({ err: error, queueUrl: this.queueUrl }, 'Failed to send SQS message');
      throw new Error(`sendMessage to SQS Queue error ${error}`);
    }
  }
}
