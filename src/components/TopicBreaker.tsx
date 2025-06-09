import React from 'react';

interface TopicBreakerProps {
  title: string;
}

const TopicBreaker: React.FC<TopicBreakerProps> = ({ title }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '2em 15vw' }}>
      <h2 style={{ margin: 0, whiteSpace: 'nowrap' }}>{title}</h2>
      <div
        style={{
          flexGrow: 1,
          height: '2px',
          backgroundColor: '#ccc',
          marginLeft: '1em',
        }}
      />
    </div>
  );
};

export default TopicBreaker;
