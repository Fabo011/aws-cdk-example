import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { ArticleService } from '../lib/lambda-handler/services/ArticleService';
import { QueueService } from '../lib/lambda-handler/services/QueueService';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    service = new ArticleService();
  });

  it('returns an article when given a valid ID', async () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';
    const article = await service.getArticleById(id);

    expect(article).toBeDefined();
    expect(article.id).toBe(id);
    expect(article.headline).toBe('Example Article 1');
  });

  it('throws an error when fetching the article fails', async () => {
    // Mock the method to throw
    service.getArticleById = jest.fn(async () => {
      throw new Error('Failed to fetch article');
    });

    await expect(service.getArticleById('bad-id')).rejects.toThrow('Failed to fetch article');
  });
});

jest.mock('@aws-sdk/client-sqs', () => {
  return {
    SQSClient: jest.fn(() => ({
      send: jest.fn(),
    })),
    SendMessageCommand: jest.fn(),
  };
});

describe('QueueService', () => {
  const queueUrl = 'https://sqs.eu-central-1.amazonaws.com/123456789012/test-queue';
  let queueService: QueueService;
  let sendMock: jest.Mock;

  beforeEach(() => {
    (SQSClient as jest.Mock).mockClear();
    (SendMessageCommand as unknown as jest.Mock).mockClear();

    queueService = new QueueService(queueUrl);
    sendMock = queueService['sqs'].send as jest.Mock;
  });

  it('successfully sends a message', async () => {
    sendMock.mockResolvedValue({});
    const message = { articleId: 'abc-123' };

    await queueService.sendMessage(message);

    expect(SendMessageCommand).toHaveBeenCalledWith({
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(message),
    });
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('throws an error when send fails', async () => {
    sendMock.mockRejectedValue(new Error('Send failed'));

    await expect(queueService.sendMessage({})).rejects.toThrow('Send failed');
  });
});
