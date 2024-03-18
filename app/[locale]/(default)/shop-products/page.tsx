import { ShoppingCart } from 'lucide-react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { getFeaturedProducts } from '~/client/queries/get-featured-products';
import { getNewestProducts } from '~/client/queries/get-newest-products';
import { Footer } from '~/components/footer/footer';
import { ProductCard } from '~/components/product-card';

export const metadata = {
  title: 'Not Found',
};

export default async function ShopAll() {
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  const [newestProducts, featuredProducts] = await Promise.all([
    getNewestProducts({ imageWidth: 500, imageHeight: 500 }),
    getFeaturedProducts({ imageWidth: 500, imageHeight: 500 }),
  ]);

  return (
    <>
      <div className="flex flex-col gap-8 px-0 py-16">
        <h2 className="text-4xl font-black lg:text-5xl">{'Shop Products'}</h2>
      </div>
      <section className='mb-4'>
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
          {newestProducts.map((product) => (
            <NextIntlClientProvider
              key={product.entityId}
              locale={locale}
              messages={{ Product: messages.Product ?? {} }}
            >
              <ProductCard
                product={product}
                showCart={false}
                showCompare={false}
                showReviews={false}
              />
            </NextIntlClientProvider>
          ))}
        </div>
      </section>
    </>
  );
}

export const runtime = 'edge';
