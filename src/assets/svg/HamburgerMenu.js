import * as React from 'react'

const HamburgerMenu = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width={71}
    height={53}
    fill='none'
    {...props}
  >
    <rect width={71} height={53} fill='#F0F0F0' rx={26.5} />
    <path fill='url(#a)' d='M19 10h33v33H19z' />
    <defs>
      <pattern
        id='a'
        width={1}
        height={1}
        patternContentUnits='objectBoundingBox'
      >
        <use xlinkHref='#b' transform='scale(.01563)' />
      </pattern>
      <image
        xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABRUlEQVR4nO3aMU4CQRjF8X8CjZZSKZZqqdhKrAC5AN5BE4nX8Bp4GxIDt1A7qLBTM2Eqk81OwYdPeb/k9d+bZZfdnQUzMzMzMzOzEkPgGZgCLyKZ5pkGBHsEPoEv0aTZxlHlW8CHQMm6pBkPIhagL1CuNGnWjesIFCvNecQCNIGZQLm6pItigyCn4ouQyp8QrAFcACPgViSjPFPYkTczM1s7Bu6BJ7GkmdoEuwGWAjc8VVlGPhLvA+8CJevyCuxFLMC1QLnSdCMWoCtQrDRXUafA2y6fAuQLzEKgZFXSbD2CHQF3An97P5NmOowub2Zmu66Z9wjUXop2tvFS9AyYC9zwVGWWX92HHfm5QMmSRQj5JVwKlCtN2iPYuL5AsV/dHG39ke3xVdT2OPnjA/UPJB4INgAmgp/ITLbxKGxmZmZmZmb8A9+32md246d89AAAAABJRU5ErkJggg=='
        id='b'
        width={64}
        height={64}
      />
    </defs>
  </svg>
)
export default HamburgerMenu
