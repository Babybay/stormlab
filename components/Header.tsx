
import React from 'react';
import CardNav, { CardNavItem } from './CardNav';

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
    <>
      <CardNav
        logo="StormLab."
        logoAlt="StormLab Logo"
        items={navItems}
        baseColor="#e0e5ec"
        menuColor="#000000"
        buttonBgColor="#000000"
        buttonTextColor="#ccff00"
      />
    </>
  );
}
