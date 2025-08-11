import pino from 'pino';
import { Article } from '../models/Article';

const logger = pino();
export class ArticleService {
  private baseUrl = 'https://standard.dev/api/articles';

  async getArticleById(id: string): Promise<Article> {
    try {
      //const response = await axios.get<Article>(`${this.baseUrl}/${id}`);
      //return response.data;
      logger.info({ articleId: id }, 'Successfully fetched article');
      return {
        id: id,
        headline: 'Example Article 1',
        author: 'Max Mustermann',
        text: 'Article text, lorem ipsum....',
        publicationDate: '2023-10-19T13:30:00',
        categories: ['cat1', 'cat2'],
      };
    } catch (error) {
      logger.error({ err: error, articleId: id }, 'Failed to fetch article');
      throw new Error(`Could not get article with id ${id}. ${error}`);
    }
  }
}
