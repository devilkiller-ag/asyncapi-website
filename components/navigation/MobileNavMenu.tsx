import Link from 'next/link';
import React, { useState } from 'react';

import { SearchButton } from '../AlgoliaSearch';
import NavItemDropdown from '../icons/NavItemDropdown';
import SearchIcon from '../icons/SearchIcon';
import AsyncAPILogo from '../logos/AsyncAPILogo';
import communityItems from './communityItems';
import learningItems from './learningItems';
import MenuBlocks from './MenuBlocks';
import otherItems from './otherItems';
import toolingItems from './toolingItems';

interface MenuItem {
  href: string;
  target?: string;
  text: string;
}

interface MobileNavMenuProps {
  onClickClose?: () => void;
  uniqueLangs: { key: string; text: string; value: string }[];
  currentLanguage: string;
  changeLanguage: (locale: string, langPicker: boolean) => void;
}

/**
 * @description MobileNavMenu component for displaying a responsive navigation menu on mobile devices.
 * @param {MobileNavMenuProps} props - The props for the MobileNavMenu component.
 */
export default function MobileNavMenu({
  onClickClose = () => {},
  uniqueLangs,
  currentLanguage,
  changeLanguage
}: MobileNavMenuProps) {
  const [open, setOpen] = useState<string | null>(null);

  /**
   * @description Function to toggle the visibility of a menu.
   * @param {string} menu - The menu to toggle.
   */
  function showMenu(menu: string) {
    if (open === menu) {
      setOpen(null);

      return;
    }
    setOpen(menu);
  }

  return (
    <div className='fixed inset-x-0 top-0 z-60 max-h-full origin-top-right overflow-y-auto py-2 transition lg:hidden'>
      <div className='rounded-lg shadow-lg'>
        <div className='shadow-xs divide-y-2 divide-gray-50 rounded-lg bg-white'>
          <div className='space-y-6 px-4 pb-6 pt-4'>
            <div className='flex items-center justify-between'>
              <Link href='/' className='cursor-pointer' data-testid='MobileNav-Logo'>
                <AsyncAPILogo className='h-10 w-auto' />
              </Link>
              <div className='justify-content -mr-2 flex flex-row items-center' data-testid='MobileNav-button'>
                <SearchButton
                  className='flex items-center space-x-2 rounded-md p-2 text-left text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none'
                  aria-label='Open Search'
                >
                  <SearchIcon />
                </SearchButton>
                <button
                  onClick={onClickClose}
                  type='button'
                  className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none'
                >
                  <svg className='size-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className='space-y-2 px-5 py-2' onClick={() => showMenu('learning')} data-testid='MobileNav-docs'>
            <h4 className='flex justify-between font-medium text-gray-800'>
              {' '}
              <a className='cursor-pointer'>
                <Link href='/docs' className='flex'>
                  Docs
                </Link>
              </a>
              <NavItemDropdown />
            </h4>
            {open === 'learning' && <MenuBlocks items={learningItems} />}
          </div>
          <div className='space-y-2 px-5 py-2' onClick={() => showMenu('tooling')} data-testid='MobileNav-tools'>
            <h4 className='flex justify-between font-medium text-gray-800'>
              {' '}
              <a className='cursor-pointer'>
                <Link href='/tools' className='flex'>
                  Tools
                </Link>
              </a>
              <NavItemDropdown />
            </h4>
            {open === 'tooling' && <MenuBlocks items={toolingItems} />}
          </div>
          <div className='space-y-2 px-5 py-2' onClick={() => showMenu('community')} data-testid='MobileNav-community'>
            <h4 className='flex justify-between font-medium text-gray-800'>
              <a className='cursor-pointer'>
                <Link href='/community' className='flex'>
                  Community
                </Link>
              </a>
              <NavItemDropdown />
            </h4>
            {open === 'community' && <MenuBlocks items={communityItems} />}
          </div>
          <div className='space-y-2 px-5 pt-2' onClick={() => showMenu('others')} data-testid='MobileNav-others'>
            <div className='grid gap-4'>
              <div>
                <h4 className='mb-4 flex justify-between font-medium text-gray-800'>
                  <a className='cursor-pointer'>Others</a>
                  <NavItemDropdown />
                </h4>
                {open === 'others' &&
                  otherItems.map((item: MenuItem, index: number) => (
                    <Link
                      href={item.href}
                      key={index}
                      target={item.target || '_self'}
                      rel='noopener noreferrer'
                      className='mb-4 block rounded-lg py-1 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-50'
                      data-testid='MobileNav-others'
                    >
                      {item.text}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className='space-y-2 px-5 py-2' onClick={() => showMenu('language')}>
            <div className='grid gap-4'>
              <div>
                <h4 className='mb-4 flex justify-between font-medium text-gray-800'>
                  <a className='flex cursor-pointer items-center gap-x-2'>
                    Language{' '}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802'
                      />
                    </svg>
                  </a>
                  <NavItemDropdown />
                </h4>
                {open === 'language' &&
                  uniqueLangs.map((lang) => (
                    <button
                      key={lang.key}
                      onClick={() => changeLanguage(lang.value.toLowerCase(), true)}
                      className={`mb-4 ml-2 block w-full rounded-lg py-1 text-start text-sm font-medium leading-6 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-50 ${currentLanguage.toLowerCase() === lang.text.toLowerCase() ? 'text-secondary-500' : ''}`}
                      data-testid='MobileNav-language-item'
                    >
                      {lang.text}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
