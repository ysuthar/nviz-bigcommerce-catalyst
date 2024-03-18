import { cache } from 'react';

import { client } from '..';
import { graphql } from '../generated';
import { revalidate } from '../revalidate-target';

const GET_BLOG_POST_QUERY = /* GraphQL */ `
  query getBlogPost($entityId: Int!) {
    site {
      content {
        blog {
          isVisibleInNavigation
          post(entityId: $entityId) {
            author
            htmlBody
            id
            name
            publishedDate {
              utc
            }
            tags
            thumbnailImage {
              altText
              url(width: 900)
            }
            seo {
              metaKeywords
              metaDescription
              pageTitle
            }
          }
        }
      }
      settings {
        url {
          vanityUrl
        }
      }
    }
  }
`;

export const getBlogPost = cache(async (entityId: number) => {
  const query = graphql(GET_BLOG_POST_QUERY);

  const response = await client.fetch({
    document: query,
    variables: { entityId },
    fetchOptions: { next: { revalidate } },
  });

  // const blog = response.data.site.content;

  // if (!blog?.post) {
  //   return null;
  // }

  // const { isVisibleInNavigation, post } = blog;

  const isVisibleInNavigation = true;
  const post = {
    "author": null,
    "id": 1,
    "htmlBody": "<p> <strong>Welcome to your blog!</strong><br> A blog is a great place to share details on your products, business and whatever else you think your shoppers might like to hear from you. You can include photos in your blog posts and even videos. For ideas and inspiration on how to structure your blog, take a look at the Bigcommerce <a href='http://blog.bigcommerce.com/' target='_blank' rel='nofollow'>ecommerce blog</a>.</p><p><strong>How can I delete this post?</strong><br>To delete this post and add your own, login to your <a href='/admin' target='_blank'>admin area</a>, click the Content tab at the top of the screen and choose Blog.</p><p><strong>Powered by Bigcommerce</strong><br>Your website, online store and blog are powered by Bigcommerce <a href='http://www.bigcommerce.com/' target='_blank' rel='nofollow'>ecommerce software</a>. It includes everything you need to run a beautiful online store including <a href='http://www.bigcommerce.com/templates/' target='_blank' rel='nofollow'>ecommerce website templates</a>, <a href='http://www.bigcommerce.com/features/hosting/' target='_blank' rel='nofollow'>ecommerce hosting</a>, an <a href='http://www.bigcommerce.com/features/setup/' target='_blank' rel='nofollow'>online shopping cart</a> and more.</p>",
    "name": "Your first blog post!",
    "path": "/your-first-blog-post/",
    "plainTextSummary": "Welcome to your blog! A blog is a great place to share details on your products, business and whatever else you think...",
    "publishedDate": {
      "utc": "2014-02-15T19:46:34Z"
    },
    "thumbnailImage": null,
    "tags": [
      "Blog",
      "SEO"
    ],
    "seo": {
      "metaKeywords": "Blog,SEO",
      "metaDescription": "",
      "pageTitle": "Your first blog post!"
    }
  };

  return {
    ...post,
    isVisibleInNavigation,
    vanityUrl: (response?.data?.site?.settings?.url.vanityUrl) || "https://buybutton.store"
  };
});
