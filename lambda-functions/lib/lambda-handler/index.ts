import { SQSEvent } from 'aws-lambda';
import pino from 'pino';
import { ArticleService } from './services/ArticleService';
import { QueueService } from './services/QueueService';

const logger = pino();

const articleService = new ArticleService();
const queueService = new QueueService(process.env.OUTPUT_QUEUE_URL!); // Defined at runtime

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body);
      const articleId = body.articleId;

      const article = await articleService.getArticleById(articleId);
      await queueService.sendMessage(article);
    } catch (error) {
      logger.error({ err: error }, 'Article handler error');
    }
  }
};
