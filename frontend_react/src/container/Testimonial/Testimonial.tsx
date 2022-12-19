import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { client, urlFor } from '../../client';

import AppWrap from '../../wrapper/AppWrap';
import MotionWrap from '../../wrapper/MotionWrap';
import './Testimonial.scss';

interface TestimonialsProps {
  company: string;
  feedback: string;
  imgUrl: string;
  name: string;
}

interface BrandsProps {
  imgUrl: string;
  name: string;
  _id: string;
}

const Testimonial = () => {
  const [brands, setBrands] = useState<BrandsProps[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialsProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const brandsQuery = '*[_type == "brands"]';
    const testimonialsQuery = '*[_type == "testimonials"]';

    client.fetch(brandsQuery).then((data: BrandsProps[]) => {
      setBrands(data);
    });

    client.fetch(testimonialsQuery).then((data: TestimonialsProps[]) => {
      setTestimonials(data);
    });
  }, []);

  const test = testimonials[currentIndex];

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {testimonials?.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(test?.imgUrl).url()} alt="testimonial" />
            <div className="app__testimonial-content">
              <p className="p-text">{test?.feedback}</p>
              <div>
                <h4 className="bold-text">{test?.name}</h4>
                <h5 className="p-text">{test?.company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl).url()} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonials',
  'app__primarybg'
);
