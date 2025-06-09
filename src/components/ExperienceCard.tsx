'use client';

import React from 'react';
import { Row, Column } from './Layouts';
import type { Experience } from '../types/experiences';
import { boxDefault } from '../themes';
import Image from 'next/image';

const defaultLogo = '/image.png'; // ✅ assumes /public/image.png

const ExperienceCard: React.FC<Experience> = ({
  title,
  company,
  dates,
  details,
  team,
  imgUrl,
  type = 'development', // Default to 'development' if not provided
}) => {
  const noPadding: React.CSSProperties = {
    padding: 0,
    margin: 0,
  };

  const formatCompanyName = (name: string): string =>
    name.replace(/university of washington/i, 'UW');

  return (
    <Row
      style={{
        margin: '3em',
        padding: '1.5em',
        gap: '2em',
        alignItems: 'flex-start',
        ...boxDefault,
      }}
    >
      {/* Logo */}
      <Column>
        <Image
          src={imgUrl || defaultLogo}
          alt={`${company} logo`}
          width={64}
          height={64}
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      </Column>

      {/* Content */}
      <Column style={{ alignItems: 'flex-start', flex: 1 }}>
        <Row style={{ justifyContent: 'space-between', width: '100%' }}>
          <p style={noPadding}>{title}</p>
          <p style={noPadding}>{dates}</p>
        </Row>
        <p style={noPadding}>
          {team ? `${team} @ ` : ''}
          {formatCompanyName(company)}
        </p>
        <p style={{ ...noPadding, whiteSpace: 'pre-wrap' }}>{details}</p>
      </Column>
    </Row>
  );
};

export default ExperienceCard;
