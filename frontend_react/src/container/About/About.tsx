import { motion } from 'framer-motion';

import './About.scss';
import images from '../../constants/images';

const About = () => {
  const abouts = [
    {
      title: 'Web Development',
      description: ' I am a good web developer',
      imgUrl: images.about01,
    },
    {
      title: 'Web Design',
      description: ' I am a good web designer',
      imgUrl: images.about02,
    },
    {
      title: 'React',
      description: ' I am a good UI/UX designer',
      imgUrl: images.about03,
    },
    {
      title: 'TypeScript',
      description: ' I am a good web animater',
      imgUrl: images.about04,
    },
  ];

  return (
    <>
      <h2 className="head-text">
        I know that
        <span> Good Development </span>
        <br />
        means
        <span> Good Business</span>
      </h2>
      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={about.imgUrl} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="bold-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default About;
