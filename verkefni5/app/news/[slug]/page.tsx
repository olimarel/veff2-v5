import { notFound } from 'next/navigation';
import { GraphQLClient, gql } from 'graphql-request';
import { ArticleResponse } from '@/lib/types';

const client = new GraphQLClient('https://graphql.datocms.com/', {
  headers: {
    authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  },
});

export async function generateStaticParams() {
  const query = gql`
    {
      allArticles {
        slug
      }
    }
  `;
  const data = await client.request<{ allArticles: { slug: string }[] }>(query);
  return data.allArticles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage(props: any) {
  const { slug } = await props.params;
  
  const query = gql`
    query GetArticle($slug: String!) {
      article(filter: { slug: { eq: $slug } }) {
        title: articletitle
        content
        image {
          url
          alt
        }
      }
    }
  `;
  
  const data = await client.request<ArticleResponse>(query, { slug });
  
  if (!data.article) {
    notFound();
  }
  
  const { title, content, image } = data.article;
  
  return (
    <main>
      <h1>{title}</h1>
      {image && (
        <img
          src={image.url}
          alt={image.alt || title}
          style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }}
        />
      )}
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
