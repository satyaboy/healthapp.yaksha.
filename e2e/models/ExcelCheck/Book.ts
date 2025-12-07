// models/Book.ts
export class Book {
  id: string;
  author: string;
  title: string;
  genre: string;
  price: number;
  publishDate: string;

  constructor(data: any) 
  {
    this.id = data.$?.id || '';
    this.author = data.author?.[0] || '';
    this.title = data.title?.[0] || '';
    this.genre = data.genre?.[0] || '';
    this.price = parseFloat(data.price?.[0] || '0');
    this.publishDate = data.publish_date?.[0] || '';
  }
}
