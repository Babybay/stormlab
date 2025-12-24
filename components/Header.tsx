import React from 'react';
import CardNav, { CardNavItem } from './CardNav';
import NavTicker from './NavTicker';

export default function Header() {
  const navItems: CardNavItem[] = [
    {
      label: 'Expertise',
      bgColor: '#ffffff',
      textColor: '#000000',
      links: [
        { label: 'Strategic Planning', href: '/services', ariaLabel: 'Strategic Planning' },
        { label: 'Social Media Planning', href: '/services', ariaLabel: 'Social Media Planning' },
        { label: 'SEO & Content Marketing', href: '/services', ariaLabel: 'SEO & Content Marketing' },
        { label: 'Design and Graphics', href: '/services', ariaLabel: 'Design and Graphics' },
      ],
    },
    {
      label: 'Company',
      bgColor: '#ffffff',
      textColor: '#000000',
      links: [
        { label: 'Work', href: '/work', ariaLabel: 'Work' },
        { label: 'About', href: '/about', ariaLabel: 'About' },
        { label: 'Blog', href: '/blog', ariaLabel: 'Blog' },
      ],
    },
    {
      label: 'Connect',
      bgColor: '#ccff00',
      textColor: '#000000',
      links: [
        { label: 'Contact', href: '/contact', ariaLabel: 'Contact' },
      ],
    },
  ];

  return (
    <div className="fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[999] top-[1.2em] md:top-[2em] flex flex-col gap-2">
      <CardNav
        logo="StormLab."
        logoAlt="StormLab Logo"
        items={navItems}
        baseColor="#e0e5ec"
        menuColor="#000000"
        buttonBgColor="#000000"
        buttonTextColor="#ccff00"
        className="!relative !inset-auto !w-full !max-w-none !transform-none !top-auto !left-auto"
      />
      <NavTicker />
    </div>
  );
}
