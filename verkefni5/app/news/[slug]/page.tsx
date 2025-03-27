// app/news/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { GraphQLClient, gql } from 'graphql-request';
import { ArticleResponse } from '@/lib/types';

// Create a GraphQL client for DatoCMS.
const client = new GraphQLClient('https://graphql.datocms.com/', {
  headers: {
    authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  },
});

// Generate static parameters for each article based on its slug.
// This function tells Next.js which slugs to pre-render.
export async function generateStaticParams() {
  const query = gql`
    {
      allArticles {
        slug
      }
    }
  `;

  const data = await client.request<{ allArticles: { slug: string }[] }>(query);
  return data.allArticles.map((article: { slug: string }) => ({ slug: article.slug }));
}

// The main component that renders an individual article.
export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  // GraphQL query to fetch a single article based on the slug.
  const query = gql`
    query GetArticle($slug: String!) {
      article(filter: { slug: { eq: $slug } }) {
        title
        content
      }
    }
  `;

  const data = await client.request<ArticleResponse>(query, { slug: params.slug });

  // If no article is found for the provided slug, render a 404 page.
  if (!data.article) {
    notFound();
  }

  const { title, content } = data.article;

  return (
    <main>
      <h1>{title}</h1>
      {/* Render the content safely. Ensure your CMS content is sanitized if needed. */}
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
