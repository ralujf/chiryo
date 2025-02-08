import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

const Stars = ({ number }) => {
  const starRef = useRef();

  useEffect(() => {
    if (starRef.current) {
      const children = Array.from(starRef.current.children);

      children.slice(0, number).forEach((child) => {
        child.classList.remove('bi-star');
        child.classList.add('bi-star-fill');
      });
    }
  }, [number]);

  return (
    <div style={{ position: 'absolute', top: '12.5%', right: '2.5%' }}>
      <div ref={starRef} className="container-fluid d-flex">
        <i
          key="1"
          className="bi bi-star"
          style={{ margin: '0 2px', fontSize: '2rem' }}
        ></i>
        <i
          key="2"
          className="bi bi-star"
          style={{ margin: '0 2px', fontSize: '2rem' }}
        ></i>
        <i
          key="3"
          className="bi bi-star"
          style={{ margin: '0 2px', fontSize: '2rem' }}
        ></i>
        <i
          key="4"
          className="bi bi-star"
          style={{ margin: '0 2px', fontSize: '2rem' }}
        ></i>
        <i
          key="5"
          className="bi bi-star"
          style={{ margin: '0 2px', fontSize: '2rem' }}
        ></i>
      </div>
    </div>
  );
};

Stars.propTypes = {
  number: PropTypes.number.isRequired,
};
export default Stars;
