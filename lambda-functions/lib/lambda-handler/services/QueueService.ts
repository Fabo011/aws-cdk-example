import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

export class QueueService {
  private sqs = new SQSClient({});
  constructor(private queueUrl: string) {}

  async sendMessage(message: any): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(message),
    });
    await this.sqs.send(command);
  }
}
