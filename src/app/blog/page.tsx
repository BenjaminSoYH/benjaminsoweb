"use client";
import React, { useEffect, useState } from 'react';

const BlogPage: React.FC = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/assets/scholarship.txt')
      .then((res) => res.text())
      .then(setText)
      .catch(console.error);
  }, []);

  const renderSections = () => {
    const sections = text.split('\n\n');

    return sections.map((section, idx) => {
      const [header, ...paragraphLines] = section.split('\n');
      return (
        <div key={idx} style={{ marginBottom: '2em' }}>
          <h3>{header}</h3>
          <p>
            {paragraphLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      );
    });
  };

  return (
    <div style={{ padding: '2em', margin: '0 auto', maxWidth: '800px' }}>
      <h1>Scholarship app</h1>
      {text ? renderSections() : <p>Loading blog content...</p>}
    </div>
  );
};

export default BlogPage;
