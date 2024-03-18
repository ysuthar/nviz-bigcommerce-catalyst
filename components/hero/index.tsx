import Image from 'next/image';

import { Button } from '@bigcommerce/components/button';
import {
  Slideshow,
  SlideshowAutoplayControl,
  SlideshowContent,
  SlideshowControls,
  SlideshowNextIndicator,
  SlideshowPagination,
  SlideshowPreviousIndicator,
  SlideshowSlide,
} from '@bigcommerce/components/slideshow';

export const Hero = () => (
  <Slideshow>
    <SlideshowContent>
      <SlideshowSlide>
        <div className="relative">
          <Image
            alt="an assortment of brandless products against a blank background"
            className="absolute -z-10 object-cover"
            fill
            priority
            sizes="(max-width: 1536px) 100vw, 1536px"
            src="/assets/images/banner1.jpg"
          />
          <div className="flex px-12 pb-48 pt-36">
            <div className='caption-box'>
              <h2 className="text-3xl font-black lg:text-4xl">Bestselling Products</h2>
              <p className="max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
              <Button asChild className="w-fit">
                <a href="/shop-products/">Shop now</a>
              </Button>
            </div>
          </div>
        </div>
      </SlideshowSlide>
      <SlideshowSlide>
        <div className="relative">
          <Image
            alt="an assortment of brandless products against a blank background"
            className="absolute -z-10 object-cover"
            fill
            priority
            sizes="(max-width: 1536px) 100vw, 1536px"
            src="/assets/images/banner2.jpg"
          />
          <div className="flex px-12 pb-48 pt-36">
            <div className='caption-box'>
              <h2 className="text-3xl font-black lg:text-4xl">Best Deals</h2>
              <p className="max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
              <Button asChild className="w-fit">
                <a href="/shop-products/">Shop now</a>
              </Button>
            </div>
          </div>
        </div>
      </SlideshowSlide>
    </SlideshowContent>
    <SlideshowControls className='bg-gray-100 '>
      <SlideshowAutoplayControl />
      <SlideshowPreviousIndicator />
      <SlideshowPagination />
      <SlideshowNextIndicator />
    </SlideshowControls>
  </Slideshow>
);
