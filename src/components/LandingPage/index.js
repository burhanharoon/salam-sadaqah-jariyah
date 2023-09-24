import React, { useState } from 'react'
import { Box } from '@mui/material'
import HamburgerMenu from 'assets/svg/HamburgerMenu'
import icon from 'assets/svg/DownloadFromAppStoreMobile.svg'
import DesignCredits from 'assets/svg/DesignCredits.svg'
import Dropdown from 'assets/svg/Dropdown'
import DropdownIcon from 'assets/svg/Dropdown'
import CustomSelect from 'components/CustomSelect'
import { languages } from 'utils/translation'

const LandingPage = () => {
  const [language, setLanguage] = useState(Object.keys(languages)[0])
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  return (
    <>
      <Box
        dir={language === 'Arabic' ? 'rtl' : 'ltr'}
        lang={language === 'Arabic' ? 'ar' : 'eng'}
        className='px-[35px] md:px-[60px] pt-[85px] w-full max-w-[1620px] m-auto'
      >
        <div className='flex items-center flex-col xl:flex-row justify-normal xl:justify-between gap-[48px] xl:gap-4'>
          <div className='w-full xl:w-auto flex items-center justify-between '>
            <h1 className='text-[35px] font-bold'>👋 Salam</h1>
            <div
              className='block xl:hidden'
              onClick={() => setIsNavbarOpen((prevState) => !prevState)}
            >
              <HamburgerMenu />
            </div>
          </div>
          <div
            className={`xl:items-center flex-col xl:flex-row gap-[30px] px-[37px] py-[30px] xl:pl-[40px] xl:pr-[15px] xl:py-0 w-full xl:w-auto h-full xl:h-[63px] bg-[#F0F0F0] text-[20px] font-semibold rounded-[31.5px] ${
              isNavbarOpen ? 'flex' : 'hidden xl:flex'
            }`}
          >
            {languages[language].navbar.map((title, index) => (
              <a
                key={title}
                className={
                  index === languages[language].navbar.length - 1
                    ? 'pr-0 lg:pr-[5px]'
                    : ''
                }
                href={title}
              >
                {title}
              </a>
            ))}
            <CustomSelect
              selectClassNames='bg-black text-white rounded-[26.5px] w-[189px] h-[45px] text-[20px] font-bold p-4'
              value={language}
              options={Object.keys(languages).map((language) => language)}
              handleChange={(newValue) => {
                setLanguage(newValue)
              }}
              iconComponent={DropdownIcon}
            />
          </div>
        </div>

        <div>
          <h1
            className={`${
              isNavbarOpen
                ? 'mobile-navbar-open md:medium-screen-navbar-open xl:large-screen-navbar-open'
                : 'mobile-navbar-close md:medium-screen-navbar-close xl:large-screen-navbar-close'
            } text-[50px] md:text-[65px] lg:text-[85px] font-bold`}
          >
            {languages[language].title}
          </h1>
          <p
            className='pt-[40px] lg:pt-[14px] font-medium text-[23px] md:text-[25px] lg:text-[30px] leading-[35px] md:leading-[43px] max-w-[1267px] w-full'
            dangerouslySetInnerHTML={{
              __html: languages[language].description,
            }}
          >
            {/* <div
              dangerouslySetInnerHTML={{
                __html: languages[language].description,
              }}
            ></div> */}
          </p>
          <div className='pt-[50px] flex items-center justify-between md:justify-normal gap-0 md:gap-[20px]'>
            <img
              src={icon}
              className='w-[146px] h-[49px] md:w-[179px] md:h-[60px]'
              fill={'green'}
              alt='download'
            />

            <button className='w-[191px] md:w-[263px] h-[49px] md:h-[60px] text-[18px] md:text-[23px] font-bold flex items-center justify-center border-[#FFCF4D] border-[5px] rounded-[25px]'>
              Donate to Support
            </button>
          </div>
          <p className='pt-[21px] font-medium text-[17px] italic md:text-[20px]'>
            {languages[language].disclaimer}
          </p>
        </div>

        <div className='bg-white lg:bg-[#F0F0F0] rounded-none lg:rounded-[31.5px] flex flex-col lg:flex-row justify-normal items-center lg:justify-between gap-[29px] mt-[145px] md:mt-[65px] lg:mt-[274px] h-auto lg:h-[63px] px-0 lg:pl-[50px] lg:pr-[52px]'>
          <div className='bg-[#F0F0F0] lg:bg-transparent rounded-[31.5px] text-[#5E5E5E] text-[15px] md:text-[18px] font-semibold grid grid-cols-2 lg:grid-flow-col gap-[25px] gap-x-[50px] md:gap-x-[120px] lg:gap-x-[33px] w-full lg:w-auto px-[40px] md:px-[79.22px] lg:px-0 py-[25px] md:py-[23px] lg:py-0'>
            {languages[language].footer.map((title, index) => (
              <a
                key={title}
                href={title}
                className={`${
                  index === languages[language].footer.length - 1
                    ? 'block lg:hidden'
                    : ''
                }`}
              >
                {title}
              </a>
            ))}
          </div>
          <p className='text-[#5E5E5E] text-center font-semibold text-[15px] lg:text-lg'>
            Copyright © 2023 Salam, All rights reserved
          </p>
          <p className='pb-[39.28px] lg:pb-0 text-[#5E5E5E] text-center font-semibold text-[15px] lg:text-lg flex gap-2 items-center'>
            Designed by{' '}
            <img src={DesignCredits} fill={'green'} alt='download' />
          </p>
        </div>
      </Box>
    </>
  )
}

export default LandingPage
