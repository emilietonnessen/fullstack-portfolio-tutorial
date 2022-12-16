import { motion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import './Skills.scss';
import AppWrap from '../../wrapper/AppWrap';
import { client, urlFor } from '../../client';
import MotionWrap from '../../wrapper/MotionWrap';

interface WorksProps {
  name: string;
  company: string;
  desc: string;
}

interface ExperienceProps {
  works: WorksProps[];
  year: string;
}

interface SkillProps {
  name: string;
  bgColor: string;
  icon: any;
}

const Skills = () => {
  const [experiences, setExperiences] = useState<ExperienceProps[]>([]);
  const [skills, setSkills] = useState<SkillProps[]>([]);

  useEffect(() => {
    const experiencesQuery = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(experiencesQuery).then((data: ExperienceProps[]) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data: SkillProps[]) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>
      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills?.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={`${skill.name}-${index}`}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon).url()} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="app__skills-exp">
          {experiences?.map((experience, index) => (
            <motion.div
              className="app__skills-exp-item"
              key={`${experience.year}-${index}`}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>

              <motion.div className="app__skills-exp-works">
                {experience.works?.map((work, index) => (
                  <Fragment key={`${work.name}-${index}`}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      //data-for={work.name}
                      id={`${work.company}-${index}`}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <Tooltip
                      anchorId={`${work.company}-${index}`}
                      // effect="solid"
                      // arrowColor="#FFF"
                      className="skills-tooltip"
                      content={work.desc}
                      place="top"
                    />
                  </Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg'
);
