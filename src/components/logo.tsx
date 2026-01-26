import React from 'react'

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export function Logo({ size = 100, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_26_4)">
        <rect width="160" height="160" fill="black" />
        <path
          d="M117.6 -54.1333L92.4944 70.4205H52.5375L68.4495 -54.1333H117.6ZM64.5599 129.867C57.6647 129.867 52.0366 127.478 47.6755 122.701C43.3734 117.865 41.5759 111.997 42.2831 105.097C42.9903 98.3744 46.0254 92.6244 51.3883 87.8475C56.8102 83.0706 62.9687 80.6821 69.8639 80.6821C76.4055 80.6821 81.8569 83.0706 86.218 87.8475C90.638 92.6244 92.4944 98.3744 91.7872 105.097C91.3157 109.697 89.695 113.885 86.9252 117.659C84.2142 121.374 80.855 124.353 76.8475 126.594C72.899 128.776 68.8031 129.867 64.5599 129.867Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_26_4">
          <rect width="160" height="160" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
