'use client';

import { useEffect, useState } from 'react';
import { Experience } from '@/types/experiences';
import { Column, Row } from '@/components/Layouts';
import { socials } from '@/types/socials';
import TopicBreaker from '@/components/TopicBreaker';
import ExperienceCard from '@/components/ExperienceCard';
import SlidingGallery from '@/components/SlidingGallery';
import LanguageTechStack from '@/components/LanguageTechStack';
import { boxDefault, theme } from '@/themes';


export default function Home() {
  const [selectedType, setSelectedType] = useState<'development' | 'research' | 'community'>('development');
  const [experienceData, setExperienceData] = useState<Experience[]>([]);

  useEffect(() => {
    fetch('/experiences.json')
      .then((res) => res.json())
      .then((data) => setExperienceData(data))
      .catch((err) => console.error('Failed to load experiences:', err));
  }, []);

  const filteredExperiences = experienceData.filter((exp) => exp.type === selectedType);

  const majorStyle: React.CSSProperties = {
    fontWeight: 'bold',
    color: theme.colors.primary,
  };

  return (
    <div style={{ margin: '10vh 0' }}>
      <header
        className="homepage-header"
        style={{
          ...boxDefault,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '60vw',
          margin: '0 auto',
        }}
      >
        <Row>
          <Column style={{ margin: '0', textAlign: 'left' }}>
            <Column>
              <h1>Benjamin So</h1>
              <Row style={{ gap: '1em', justifyContent: 'center' }}>
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5em',
                      textDecoration: 'none',
                    }}
                  >
                    <img
                      src={social.logo}
                      alt={social.platform}
                      style={{ width: '1.5em', height: '1.5em' }}
                    />
                  </a>
                ))}
              </Row>
            </Column>
            <Column>
              <p>{`A Visitor! This website is still in development, so it might look unfinished.`}</p>
              <p>
                {`I'm a rising junior at the University of Washington, studying `}
                <span style={majorStyle}>{`Applied & Computational Math`}</span>
                {` and `}
                <span style={majorStyle}>{`Electrical & Computer Engineering.`}</span>
                {` While that's technically my major, my focus is in software engineering.`}
              </p>
              <p>
                {`Most of my projects have been about building tools that support other fields. Right now, I'm working at UW Housing & Food Services, where I'm developing a fun little printer management program called Skittles.`}
              </p>
              <p>
                {`Outside the classroom, I stay active in the community through clubs like SWECC and HCP. I've led projects and mentored others in React development. I'm also an upcoming ACMS ambassador.`}
              </p>
            </Column>
          </Column>
        </Row>
      </header>

      <TopicBreaker title="Experiences" />

      <section id="experiences" style={{ margin: '0 20vw' }}>
        <Row
          style={{
            gap: '1em',
            marginBottom: '1em',
            alignContent: 'space-evenly',
            justifyContent: 'center',
          }}
        >
          {['development', 'research', 'community'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as typeof selectedType)}
              style={{
                padding: '0.5em 1em',
                borderRadius: '0.5em',
                border: selectedType === type ? '2px solid #fff' : '1px solid gray',
                backgroundColor: selectedType === type ? theme.colors.primary : 'rgba(55, 66, 82, 0.8)',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </Row>

        {filteredExperiences.map((exp, index) => (
          <ExperienceCard
            key={index}
            company={exp.company}
            title={exp.title}
            team={exp.team}
            details={exp.details}
            dates={exp.dates}
            imgUrl={exp.imgUrl}
            type={exp.type}
          />
        ))}
      </section>

      <TopicBreaker title="Random stuff I worked on" />
      <SlidingGallery />
      <TopicBreaker title="Skills" />
      <LanguageTechStack />
    </div>
  );
}
