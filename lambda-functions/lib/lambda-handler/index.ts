import { SQSEvent } from 'aws-lambda';
import { ArticleService } from './services/ArticleService';
import { QueueService } from './services/QueueService';

const articleService = new ArticleService();
const queueService = new QueueService(process.env.OUTPUT_QUEUE_URL!);

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body);
      const articleId = body.articleId;

      console.log(`Processing articleId: ${articleId}`);
      
      const article = await articleService.getArticleById(articleId);
      await queueService.sendMessage(article);
      
    } catch (err) {
      console.error('Error processing record', err);
    }
  }
};
