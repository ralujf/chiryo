import { useRef, useEffect } from 'react';

const Stars = (props) => {
  const number = props;
  const starRef = useRef();

  useEffect(() => {
    if (starRef.current) {
      const children = Array.from(starRef.current.children);
      children.slice(0, number).forEach((child, index) => {
        console.log(`Child ${index + 1}:`, child);
        child.classList.add('-fill');
      });
    }
  }, [number]);

  return (
    <div ref={starRef} className="container-fluid d-flex">
      <i key="1" className="bi bi-star"></i>
      <i key="2" className="bi bi-star"></i>
      <i key="3" className="bi bi-star"></i>
      <i key="4" className="bi bi-star"></i>
      <i key="5" className="bi bi-star"></i>
    </div>
  );
};

export default Stars;
