import React from 'react';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Row({ children, style }: Props): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        ...style, // Allow override
      }}
    >
      {children}
    </div>
  );
}

export function Column({ children, style }: Props): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        ...style, // Allow override
      }}
    >
      {children}
    </div>
  );
}
