import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import './Skills.scss';
import AppWrap from '../../wrapper/AppWrap';
import { client, urlFor } from '../../client';

interface ExperienceProps {}

interface SkillProps {
  name: string;
  backgroundColor: string;
  icon: any;
}

const Skills = () => {
  const [experience, setExperience] = useState<ExperienceProps[]>([]);
  const [skills, setSkills] = useState<SkillProps[]>([]);

  useEffect(() => {
    const experiencesQuery = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(experiencesQuery).then((data: ExperienceProps[]) => {
      setExperience(data);
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
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.backgroundColor }}
              >
                <img src={urlFor(skill.icon).url()} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(Skills, 'skills');
