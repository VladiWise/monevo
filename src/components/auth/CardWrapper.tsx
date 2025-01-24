"use client";

import { LoginHeader } from "@/components/auth/LoginHeader";
import { MainContainer } from "@/components/MainContainer";
import { Social } from "@/components/auth//Social";
import { BackButton } from "@/components/auth/BackButton";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLable: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLable,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <MainContainer>
      <LoginHeader label={headerLabel} />

      {children}

      {showSocial && <Social />}

      <BackButton label={backButtonLable} href={backButtonHref} />
    </MainContainer>
  );
}
