'use client';

import Image from 'next/image';

import {
  Gallery as ComponentsGallery,
  GalleryContent,
  GalleryControls,
  GalleryImage,
  GalleryThumbnail,
  GalleryThumbnailItem,
  GalleryThumbnailList,
} from '@bigcommerce/components/gallery';
import { getProduct } from '~/client/queries/get-product';

type Product = Awaited<ReturnType<typeof getProduct>>;

export const Gallery = ({
  product,
  noImageText,
}: {
  product: NonNullable<Product>;
  noImageText?: string;
}) => {
  // Make a copy of product.images
  const images = product.images;

  // Pick the top-level default image out of the `Image` response
  const topLevelDefaultImg = product.images.find((image) => image.isDefault);

  // If product.defaultImage exists, and product.defaultImage.url is not equal to the url of the isDefault image in the Image response,
  // mark the existing isDefault image to "isDefault = false" and append the correct default image to images
  if (product.defaultImage && topLevelDefaultImg?.url !== product.defaultImage.url) {
    images.forEach((image) => {
      image.isDefault = false;
    });

    images.push({
      url: product.defaultImage.url,
      altText: product.defaultImage.altText,
      isDefault: true,
    });
  }

  const defaultImageIndex = images.findIndex((image) => image.isDefault);

  return (
    <div className="-mx-6 mb-10 sm:-mx-0 md:mb-12">
      <div className="lg:sticky lg:top-0">
        <ComponentsGallery defaultImageIndex={defaultImageIndex} images={images}>
          <GalleryContent>
            <GalleryImage>
              {({ selectedImage }) =>
                selectedImage ? (
                  <Image
                    alt={selectedImage.altText}
                    className="h-full w-full object-cover"
                    fill
                    priority={true}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={selectedImage.url}
                  />
                ) : (
                  // <div className="flex aspect-square items-center justify-center bg-gray-200">
                  //   <div className="text-base font-semibold text-gray-500">
                  //     {noImageText ?? 'Coming soon'}
                  //   </div>
                  // </div>
                  <Image
                    alt={""}
                    className="h-full w-full object-cover"
                    fill
                    priority={true}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={"/assets/images/broken-image.jpg"}
                  />
                )
              }
            </GalleryImage>
            <GalleryControls />
          </GalleryContent>
          <GalleryThumbnailList className="px-6 sm:px-1">
            {images.map((image, index) => {
              return (
                <GalleryThumbnailItem imageIndex={index} key={image.url}>
                  <GalleryThumbnail asChild>
                    <Image alt={image.altText} priority={true} src={image.url} />
                  </GalleryThumbnail>
                </GalleryThumbnailItem>
              );
            })}
          </GalleryThumbnailList>
        </ComponentsGallery>
      </div>
    </div>
  );
};
