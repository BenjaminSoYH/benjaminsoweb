import React, { useState } from 'react';
import { theme } from '../themes';

const data: Record<string, string[]> = {
  "JavaScript": ["React", "Node.js", "Express"],
  "Python": ["NumPy", "OpenCV", "FastAPI", "requests"],
  "Java": ["Apache poi", "Swing"],
  "C#": ["WPF", "BarTender SDK", "SQL Server"]
};

const LanguageTechStack: React.FC = () => {
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  return (
    <div
      style={{
        margin: '5vh auto',
        maxWidth: '1000px',
        borderRadius: theme.radius.default
      }}
    >
      <h3 style={{ color: theme.colors.primary, marginBottom: '1em' }}>Languages</h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5em',
          marginBottom: '2em'
        }}
      >
        {Object.keys(data).map((lang) => (
          <div
            key={lang}
            onMouseEnter={() => setHoveredLang(lang)}
            onMouseLeave={() => setHoveredLang(null)}
            style={{
              padding: '0.5em 1em',
              cursor: 'pointer',
              fontWeight: hoveredLang === lang ? 'bold' : 'normal',
              backgroundColor: hoveredLang === lang ? theme.colors.border : theme.colors.background,
              color: theme.colors.text,
              borderRadius: theme.radius.default,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {lang}
          </div>
        ))}
      </div>

      <h3 style={{ color: theme.colors.primary, marginBottom: '1em' }}>Tech Stack</h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5em'
        }}
      >
        {Object.entries(data).flatMap(([lang, stacks]) =>
          stacks.map((stack) => (
            <div
              key={`${lang}-${stack}`}
              style={{
                padding: '0.3em 1em',
                color: hoveredLang === lang ? theme.colors.primary : theme.colors.text,
                fontWeight: hoveredLang === lang ? 600 : 400,
                borderRadius: theme.radius.default,
                transition: 'color 0.2s ease',
                backgroundColor: hoveredLang === lang ? theme.colors.border : 'transparent'
              }}
            >
              {stack}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LanguageTechStack;
