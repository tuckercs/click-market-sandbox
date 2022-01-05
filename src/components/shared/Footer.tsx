import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterText = styled.a(
  ({ theme }) => `
  font: ${theme.fonts.small()};
  line-height: 18px;
`
);

const FooterLogo = styled.div`
  margin: 34px 0;
  z-index: ${({ theme }) => theme.zIndex.footerLogo}; ;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <Link href="https://www.metaver.so/health" passHref>
        <FooterText>Health and Safety Guidelines</FooterText>
      </Link>
      <FooterLogo>
        <Image
          src="/images/metaverso-logo.svg"
          alt="logo"
          width={276}
          height={30}
        />
      </FooterLogo>
    </StyledFooter>
  );
};
