import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { QUESTIONS } from '../api/questions';

const Stars = ({ number }) => {
  const starRef = useRef();

  useEffect(() => {
    if (starRef.current) {
      const children = Array.from(starRef.current.children);

      for (let i = 0; i < children.length; i++) {
        if (i < number) {
          children[i].classList.remove('bi-star');
          children[i].classList.add('bi-star-fill');
        } else {
          children[i].classList.remove('bi-star-fill');
          children[i].classList.add('bi-star');
        }
      }
    }
  }, [number]);

  return (
    <div style={{ position: 'absolute', top: '12.5%', right: '2.5%' }}>
      <div ref={starRef} className="container-fluid d-flex">
        {Array.from({ length: QUESTIONS.length }).map((_, index) => (
          <i
            key={index}
            className="bi bi-star"
            style={{ margin: '0 2px', fontSize: '2rem' }}
          ></i>
        ))}
      </div>
    </div>
  );
};

Stars.propTypes = {
  number: PropTypes.number.isRequired,
};
export default Stars;
