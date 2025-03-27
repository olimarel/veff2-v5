// lib/types.ts

// Homepage data type
export interface HomepageResponse {
    homepage: {
      title: string;
      content: string;
    };
  }
  
  // Article data types
  export interface Article {
    title: string;
    content: string;
  }
  
  export interface ArticleResponse {
    article: Article | null;
  }
  