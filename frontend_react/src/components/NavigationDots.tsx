import React from 'react';

const NavigationDots = ({ active }: { active: string }) => {
  return (
    <div className="app__navigation">
      {['home', 'about', 'work', 'skills', 'testimonials', 'contact'].map(
        (item, index) => (
          <a
            key={item + index}
            href={`#${item}`}
            className="app__navigation-dot"
            style={active === item ? { backgroundColor: '#313BAC' } : {}}
            aria-label={item}
          />
        )
      )}
    </div>
  );
};

export default NavigationDots;
