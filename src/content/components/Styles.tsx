import React, { useEffect, useState } from 'react';

const Styles: React.FC = () => {
  const [styles, setStyles] = useState<Element[]>([]);

  useEffect(() => {
    const styles = document.querySelectorAll('#vite-styles > style');
    setStyles([...styles]);
  }, []);

  return (
    <>
      {styles.map((style, index) => (
        <style key={index}>{style.textContent}</style>
      ))}
    </>
  );
};

export default Styles;
