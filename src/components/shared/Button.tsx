import React from "react";
import styled from "styled-components";

interface IButton {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const SmallButton = styled.button<IButton>(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.small};
  min-height: 48px;
  padding: 7px 48px;
`
);

const BigButton = styled.button<IButton>(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.medium};
  min-height: 78px;
  padding: 0;
  width: 100%;
`
);

export const Button = ({
  onClick,
  children,
  disabled = false,
  isBig = false,
  className,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  isBig?: boolean;
  className?: string;
}) =>
  isBig ? (
    <BigButton onClick={onClick} disabled={disabled} className={className}>
      {children}
    </BigButton>
  ) : (
    <SmallButton onClick={onClick} disabled={disabled} className={className}>
      {children}
    </SmallButton>
  );
