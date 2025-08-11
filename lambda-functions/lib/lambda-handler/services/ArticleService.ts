import { Article } from '../models/Article';

export class ArticleService {
  private baseUrl = 'https://standard.dev/api/articles';

  async getArticleById(id: string): Promise<Article> {
    //const response = await axios.get<Article>(`${this.baseUrl}/${id}`);
    //return response.data;
    return {
      id: id,
      headline: 'Example Article 1',
      author: 'Max Mustermann',
      text: 'Article text, lorem ipsum....',
      publicationDate: '2023-10-19T13:30:00',
      categories: ['cat1', 'cat2']
    };
  }
}
