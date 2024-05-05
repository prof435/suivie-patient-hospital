import React from 'react';

const Education = () => {
  const educationalResources = [
    'Article 1',
    'Article 2',
    'Vidéo 1',
    'Vidéo 2',
    'PDF 1',
  ];

  return (
    <div>
      <h2>Ressources éducatives</h2>
      <ul>
        {educationalResources.map((resource, index) => (
          <li key={index}>{resource}</li>
        ))}
      </ul>
    </div>
  );
};

export default Education;