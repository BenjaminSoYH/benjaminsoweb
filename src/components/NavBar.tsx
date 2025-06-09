'use client';

import React from 'react';
import Link from 'next/link';

const navStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1000,
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(0, 0, 0, 0.67)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0.75em 1.5em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
};

const siteNameStyle: React.CSSProperties = {
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.2em',
  position: 'absolute',
  left: '1.5em',
};

const linkGroupWrapperStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
};

const linkGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2em',
};

const linkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1rem',
  transition: 'color 0.3s',
};

const Navbar: React.FC = () => {
  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={siteNameStyle}>benjaminso.me</div>
        <div style={linkGroupWrapperStyle}>
          <div style={linkGroupStyle}>
            <Link href="/" style={linkStyle}>Home</Link>
            <Link href="/contact" style={linkStyle}>Contact</Link>
            <Link href="/canvas" style={linkStyle}>Canvases</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
