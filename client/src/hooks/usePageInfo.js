import { useEffect } from 'react';

const usePageInfo = ({ title, metaDescription }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      let metaTag = document.querySelector('meta[name="description"]');
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = 'description';
        document.head.appendChild(metaTag);
      }
      metaTag.content = metaDescription;
    }
  }, [title, metaDescription]);
};

export default usePageInfo;
