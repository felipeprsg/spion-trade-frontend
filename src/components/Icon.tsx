import React from 'react';

import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from '@chakra-ui/react';

export type IconName = keyof typeof ICONS;

interface IconProps extends ChakraIconProps {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  return React.cloneElement(ICONS[name], props);
};

const ICONS = {
  eye: (
    <ChakraIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      boxSize="16px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_461_88)">
        <path
          d="M6.6 2.82667C7.05889 2.71926 7.52871 2.66557 8 2.66667C12.6667 2.66667 15.3333 8.00001 15.3333 8.00001C14.9287 8.75708 14.446 9.46983 13.8933 10.1267M9.41334 9.41334C9.23024 9.60984 9.00944 9.76744 8.76411 9.87676C8.51877 9.98607 8.25394 10.0448 7.9854 10.0496C7.71686 10.0543 7.45011 10.0049 7.20108 9.90433C6.95204 9.80374 6.72582 9.65403 6.5359 9.46411C6.34599 9.27419 6.19627 9.04797 6.09568 8.79893C5.99509 8.5499 5.94569 8.28315 5.95043 8.01461C5.95517 7.74607 6.01394 7.48124 6.12326 7.23591C6.23257 6.99057 6.39017 6.76977 6.58667 6.58667M11.96 11.96C10.8204 12.8287 9.43274 13.3099 8 13.3333C3.33334 13.3333 0.666672 8.00001 0.666672 8.00001C1.49593 6.4546 2.6461 5.10441 4.04 4.04001L11.96 11.96Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.666672 0.666672L15.3333 15.3333"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_461_88">
          <rect width="16" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </ChakraIcon>
  ),
  email: (
    <ChakraIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      boxSize="24px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9026 8.85115L13.4593 12.4642C12.6198 13.1302 11.4387 13.1302 10.5992 12.4642L6.11841 8.85115"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9089 21C19.9502 21.0084 22 18.5095 22 15.4384V8.57001C22 5.49883 19.9502 3 16.9089 3H7.09114C4.04979 3 2 5.49883 2 8.57001V15.4384C2 18.5095 4.04979 21.0084 7.09114 21H16.9089Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ChakraIcon>
  ),
  lock: (
    <ChakraIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      boxSize="24px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.4234 9.4478V7.3008C16.4234 4.7878 14.3854 2.7498 11.8724 2.7498C9.35937 2.7388 7.31337 4.7668 7.30237 7.2808V7.3008V9.4478"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6832 21.2496H8.04218C5.94818 21.2496 4.25018 19.5526 4.25018 17.4576V13.1686C4.25018 11.0736 5.94818 9.3766 8.04218 9.3766H15.6832C17.7772 9.3766 19.4752 11.0736 19.4752 13.1686V17.4576C19.4752 19.5526 17.7772 21.2496 15.6832 21.2496Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8629 14.2027V16.4237"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ChakraIcon>
  ),
  check: (
    <ChakraIcon
      width="16"
      height="17"
      viewBox="0 0 16 17"
      boxSize="17px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99998 15.0979C11.5346 15.0979 14.4 12.2325 14.4 8.69791C14.4 5.16329 11.5346 2.29791 7.99998 2.29791C4.46535 2.29791 1.59998 5.16329 1.59998 8.69791C1.59998 12.2325 4.46535 15.0979 7.99998 15.0979ZM10.9657 7.6636C11.2781 7.35118 11.2781 6.84465 10.9657 6.53223C10.6532 6.21981 10.1467 6.21981 9.83429 6.53223L7.19998 9.16654L6.16566 8.13223C5.85324 7.81981 5.34671 7.81981 5.03429 8.13223C4.72187 8.44465 4.72187 8.95118 5.03429 9.2636L6.63429 10.8636C6.94671 11.176 7.45324 11.176 7.76566 10.8636L10.9657 7.6636Z"
        fill="currentColor"
      />
    </ChakraIcon>
  ),
  warn: (
    <ChakraIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      boxSize="16px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 11.8784C2 11.5151 2.0933 11.1579 2.27096 10.841L5.977 4.23022C6.30887 3.63823 6.88339 3.22131 7.54911 3.08937V3.08937C7.84681 3.03036 8.15319 3.03036 8.45089 3.08937V3.08937C9.11661 3.22131 9.69113 3.63823 10.023 4.23021L13.729 10.841C13.9067 11.1579 14 11.5151 14 11.8784V11.8784C14 13.0501 13.0501 14 11.8784 14H4.12156C2.94986 14 2 13.0501 2 11.8784V11.8784Z"
        stroke="currentColor"
      />
      <path
        d="M8 6.00001L8 8.66667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.6667L8 11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ChakraIcon>
  ),
  arrow: (
    <ChakraIcon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      boxSize="20px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.29289 9.70711C2.90237 9.31658 2.90237 8.68342 3.29289 8.29289L9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289L16.7071 8.29289C17.0976 8.68342 17.0976 9.31658 16.7071 9.70711C16.3166 10.0976 15.6834 10.0976 15.2929 9.70711L11 5.41421L11 17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17L9 5.41421L4.70711 9.70711C4.31658 10.0976 3.68342 10.0976 3.29289 9.70711Z"
        fill="currentColor"
      />
    </ChakraIcon>
  ),
  down: (
    <ChakraIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      boxSize="24px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 9L11.2191 14.3306C11.6684 14.7158 12.3316 14.7158 12.7809 14.3306L19 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </ChakraIcon>
  ),
  japan: (
    <ChakraIcon
      width="21"
      height="16"
      viewBox="0 0 21 16"
      boxSize="21px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_332_147)">
        <mask
          id="mask0_332_147"
          // style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="21"
          height="16"
        >
          <path d="M0 0H21V16H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_332_147)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-1.3125 0H22.3125V16H-1.3125V0Z"
            fill="white"
          />
          <path
            d="M10.5017 12.9742C13.2056 12.9742 15.3975 10.7475 15.3975 8.00074C15.3975 5.25398 13.2056 3.02728 10.5017 3.02728C7.79786 3.02728 5.60596 5.25398 5.60596 8.00074C5.60596 10.7475 7.79786 12.9742 10.5017 12.9742Z"
            fill="#D30000"
          />
        </g>
      </g>

      <defs>
        <clipPath id="clip0_332_147">
          <rect width="21" height="16" rx="4" fill="white" />
        </clipPath>
      </defs>
    </ChakraIcon>
  ),
  brazil: (
    <ChakraIcon
      width="21"
      height="16"
      viewBox="0 0 21 16"
      boxSize="21px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_429_261)">
        <mask
          id="mask0_429_261"
          // style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="21"
          height="16"
        >
          <path d="M0 0H21V16H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_429_261)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-1.3125 0H22.3125V16H-1.3125V0Z"
            fill="#6DA544"
          />
          <path
            d="M10.5017 12.9743C13.2056 12.9743 15.3975 10.7476 15.3975 8.0008C15.3975 5.25404 13.2056 3.02734 10.5017 3.02734C7.79786 3.02734 5.60596 5.25404 5.60596 8.0008C5.60596 10.7476 7.79786 12.9743 10.5017 12.9743Z"
            fill="#D30000"
          />
        </g>
        <g clipPath="url(#clip1_429_261)">
          <path
            d="M10.9998 17C15.9703 17 19.9998 12.9706 19.9998 8C19.9998 3.02944 15.9703 -1 10.9998 -1C6.02919 -1 1.99976 3.02944 1.99976 8C1.99976 12.9706 6.02919 17 10.9998 17Z"
            fill="#6DA544"
          />
          <path
            d="M11 2.52173L18.4347 7.99999L11 13.4782L3.56519 7.99999L11 2.52173Z"
            fill="#FFDA44"
          />
          <path
            d="M11 11.1305C12.7289 11.1305 14.1305 9.72893 14.1305 8.00005C14.1305 6.27116 12.7289 4.86963 11 4.86963C9.27116 4.86963 7.86963 6.27116 7.86963 8.00005C7.86963 9.72893 9.27116 11.1305 11 11.1305Z"
            fill="#F0F0F0"
          />
          <path
            d="M9.43481 7.80444C8.89045 7.80444 8.36511 7.88724 7.87061 8.04087C7.89251 9.75087 9.28484 11.1305 11 11.1305C12.0606 11.1305 12.9973 10.6026 13.5636 9.79573C12.5948 8.58294 11.1041 7.80444 9.43481 7.80444Z"
            fill="#0052B4"
          />
          <path
            d="M14.0724 8.59981C14.11 8.40561 14.1304 8.20525 14.1304 8.00005C14.1304 6.27113 12.7289 4.86963 11 4.86963C9.70996 4.86963 8.60254 5.65013 8.12329 6.76452C8.54692 6.67673 8.98553 6.6305 9.43479 6.6305C11.253 6.63046 12.8978 7.38625 14.0724 8.59981Z"
            fill="#0052B4"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_429_261">
          <rect width="21" height="16" rx="4" fill="white" />
        </clipPath>
        <clipPath id="clip1_429_261">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(2 -1)"
          />
        </clipPath>
      </defs>
    </ChakraIcon>
  ),
  arab: (
    <ChakraIcon
      width="21"
      height="16"
      viewBox="0 0 21 16"
      boxSize="21px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_429_260)">
        <mask
          id="mask0_429_260"
          // style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="21"
          height="16"
        >
          <path d="M0 0H21V16H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_429_260)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-1.3125 0H22.3125V16H-1.3125V0Z"
            fill="white"
          />
          <path
            d="M10.5017 12.9743C13.2056 12.9743 15.3975 10.7476 15.3975 8.0008C15.3975 5.25404 13.2056 3.02734 10.5017 3.02734C7.79786 3.02734 5.60596 5.25404 5.60596 8.0008C5.60596 10.7476 7.79786 12.9743 10.5017 12.9743Z"
            fill="#D30000"
          />
        </g>
        <g clipPath="url(#clip1_429_260)">
          <path
            d="M10.0002 17.0001C14.9708 17.0001 19.0002 12.9707 19.0002 8.00012C19.0002 3.02956 14.9708 -0.999878 10.0002 -0.999878C5.02968 -0.999878 1.00024 3.02956 1.00024 8.00012C1.00024 12.9707 5.02968 17.0001 10.0002 17.0001Z"
            fill="#F0F0F0"
          />
          <path
            d="M6.08716 11.1304L6.86977 16.4402C7.84472 16.802 8.89931 17 10.0002 17C13.8698 17 17.1688 14.5576 18.4404 11.1304H6.08716Z"
            fill="black"
          />
          <path
            d="M6.08716 4.86958L6.86977 -0.440277C7.84472 -0.80207 8.89931 -1 10.0002 -1C13.8698 -1 17.1688 1.44237 18.4404 4.86958H6.08716Z"
            fill="#6DA544"
          />
          <path
            d="M1 8.00002C1 11.8697 3.44241 15.1686 6.86958 16.4402V-0.440186C3.44241 0.831452 1 4.13034 1 8.00002Z"
            fill="#A2001D"
          />
        </g>
        <rect width="7" height="17" fill="#A2001D" />
        <rect x="7" y="11" width="14" height="7" fill="black" />
        <rect x="7" y="-2" width="14" height="7" fill="#6DA544" />
        <rect x="7" y="5" width="14" height="6" fill="#F0F0F0" />
      </g>
      <defs>
        <clipPath id="clip0_429_260">
          <rect width="21" height="16" rx="4" fill="white" />
        </clipPath>
        <clipPath id="clip1_429_260">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(1 -1)"
          />
        </clipPath>
      </defs>
    </ChakraIcon>
  ),
} as const;
