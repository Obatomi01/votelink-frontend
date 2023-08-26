'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import styles from '@/styles/general/nav.module.scss';

import MenuIcon from '@/../public/icons/more.png';
import CloseIcon from '@/../public/icons/close.png';
import Logo from '@/../public/images/ammanlogo.png';

function Nav() {
  const pathname = usePathname();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Apply overflow: hidden to body when the navigation bar is shown
    if (showNavBar) {
      document.body.style.overflow = 'hidden';
      document.body.style.maxHeight = '100vh';
      // document.body.style.position = 'fixed';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      // document.body.style.position = 'relative';
    }
  }, [showNavBar]);

  const onShowNavBarHandler = () => {
    setShowNavBar(!showNavBar);
  };

  const navLinks = [
    {
      href: '/admin/sessions',
      name: 'All Sessions',
    },
    {
      href: '/admin/election-session/create',
      name: 'Create a new session',
    },
    {
      href: '/admin/voter-management/all-users',
      name: 'All users',
    },
    {
      href: '/admin/voter-management/create-user',
      name: 'Create a new voter',
    },
    {
      href: '/login',
      name: 'Logout',
    },
  ];

  return (
    <>
      {isSmallScreen
        ? !showNavBar && (
            <span onClick={onShowNavBarHandler}>
              <Image
                src={MenuIcon}
                alt='icon'
                className={`${styles['nav--icon']} ${styles['menu--icon']}`}
              />
            </span>
          )
        : ''}
      <div
        className={`${styles['nav--main__container']} ${
          showNavBar ? styles['show--nav'] : styles['hide--nav']
        }`}
      >
        <div className={styles['nav--container']}>
          <div className={styles['nav--logo__container']}>
            <Image
              src={Logo}
              alt='Logo'
              width={70}
              height={50}
              className={styles['company--logo']}
            />

            <div className={styles['flex--nav__container']}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    className={isActive ? styles['active--link'] : ''}
                    href={link.href}
                    key={link.name}
                  >
                    <p>{link.name}</p>
                  </Link>
                );
              })}
              I
            </div>
          </div>
        </div>
      </div>
      {showNavBar && (
        <div
          className={styles['blurry--background']}
          onClick={() => setShowNavBar(false)}
        >
          {isSmallScreen
            ? showNavBar && (
                <span
                  className={styles['close--icon__container']}
                  onClick={onShowNavBarHandler}
                >
                  <Image
                    src={CloseIcon}
                    alt='icon'
                    className={`${styles['nav--icon']} ${styles['close--icon']} `}
                  />
                </span>
              )
            : ''}
        </div>
      )}
    </>
  );
}

export default Nav;
