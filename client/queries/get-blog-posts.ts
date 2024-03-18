import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { cache } from 'react';

import { client } from '..';
import { graphql } from '../generated';
import { revalidate } from '../revalidate-target';

interface BlogPostsFiltersInput {
  tagId?: string;
}

interface Pagination {
  limit?: number;
  before?: string;
  after?: string;
}

const GET_BLOG_POSTS_QUERY = /* GraphQL */ `
  query getBlogPosts(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filters: BlogPostsFiltersInput
  ) {
    site {
      content {
        blog {
          id
          isVisibleInNavigation
          name
          posts(first: $first, after: $after, last: $last, before: $before, filters: $filters) {
            pageInfo {
              ...PageDetails
            }
            edges {
              node {
                author
                entityId
                htmlBody
                name
                path
                plainTextSummary
                publishedDate {
                  utc
                }
                thumbnailImage {
                  url(width: 300)
                  altText
                }
                seo {
                  metaKeywords
                  metaDescription
                  pageTitle
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getBlogPosts = cache(
  async ({ tagId, limit = 9, before, after }: BlogPostsFiltersInput & Pagination) => {
    const filterArgs = tagId ? { filters: { tags: [tagId] } } : {};
    const paginationArgs = before ? { last: limit, before } : { first: limit, after };

    const query = graphql(GET_BLOG_POSTS_QUERY);

    const response = await client.fetch({
      document: query,
      variables: { ...filterArgs, ...paginationArgs },
      fetchOptions: { next: { revalidate } },
    });

    const blog = response.data.site.content.blog || {
        "id": "QmxvZzox",
        "isVisibleInNavigation": true,
        "name": "Blog",
        "posts": {
          "pageInfo": {
            "hasNextPage": false,
            "hasPreviousPage": false,
            "startCursor": "YXJyYXljb25uZWN0aW9uOjA=",
            "endCursor": "YXJyYXljb25uZWN0aW9uOjA="
          },
          "edges": [
            {
              "node": {
                "author": null,
                "entityId": 1,
                "htmlBody": "<p> <strong>Welcome to your blog!</strong><br> A blog is a great place to share details on your products, business and whatever else you think your shoppers might like to hear from you. You can include photos in your blog posts and even videos. For ideas and inspiration on how to structure your blog, take a look at the Bigcommerce <a href='http://blog.bigcommerce.com/' target='_blank' rel='nofollow'>ecommerce blog</a>.</p><p><strong>How can I delete this post?</strong><br>To delete this post and add your own, login to your <a href='/admin' target='_blank'>admin area</a>, click the Content tab at the top of the screen and choose Blog.</p><p><strong>Powered by Bigcommerce</strong><br>Your website, online store and blog are powered by Bigcommerce <a href='http://www.bigcommerce.com/' target='_blank' rel='nofollow'>ecommerce software</a>. It includes everything you need to run a beautiful online store including <a href='http://www.bigcommerce.com/templates/' target='_blank' rel='nofollow'>ecommerce website templates</a>, <a href='http://www.bigcommerce.com/features/hosting/' target='_blank' rel='nofollow'>ecommerce hosting</a>, an <a href='http://www.bigcommerce.com/features/setup/' target='_blank' rel='nofollow'>online shopping cart</a> and more.</p>",
                "name": "Your first blog post!",
                "path": "/your-first-blog-post/",
                "plainTextSummary": "Welcome to your blog! A blog is a great place to share details on your products, business and whatever else you think...",
                "publishedDate": {
                  "utc": "2014-02-15T19:46:34Z"
                },
                "thumbnailImage": null,
                "seo": {
                  "metaKeywords": "Blog,SEO",
                  "metaDescription": "",
                  "pageTitle": "Your first blog post!"
                }
              }
            }
          ]
        }
    };

    console.log('response.data.site.content', response.data.site.content)

    if (!blog) {
      return null;
    }

    return {
      ...blog,
      posts: {
        pageInfo: blog.posts.pageInfo,
        items: removeEdgesAndNodes(blog.posts),
      },
    };
  },
);
