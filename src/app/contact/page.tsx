'use client';

import React, { useEffect, useState } from 'react';
import { theme } from '@/themes';
import TopicBreaker from '@/components/TopicBreaker';

const ContactPage: React.FC = () => {
  const [friends, setFriends] = useState<{ url: string; description: string }[]>([]);

  useEffect(() => {
    fetch('/friends.json')
      .then(res => res.json())
      .then(setFriends)
      .catch(err => console.error('Failed to load friends:', err));
  }, []);

  return (
    <div style={{ padding: '2em 10vw' }}>
      <TopicBreaker title="My Friends" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2em',
          gap: '1em',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {friends.map((friend, idx) => (
          <a
            key={idx}
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              maxWidth: '600px',
              display: 'block',
              padding: '1em',
              textDecoration: 'none',
              boxSizing: 'border-box',
              boxShadow: theme.shadows.medium,
              borderRadius: theme.radius.default,
            }}
          >
            <p style={{ margin: 0, color: theme.colors.primary }}>
              {friend.url.replace('https://', '')}
            </p>
            <p style={{ margin: '0 0 0 5em' }}>{friend.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
