export interface HomepageResponse {
    homepage: {
      title: string;
      content: string;
    };
  }
  
  export interface Article {
    title: string;
    content: string;
    image: {
      url: string;
      alt?: string;
    };
  }
  
  export interface ArticleResponse {
    article: Article | null;
  }
  