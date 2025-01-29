import { LoginHeader } from "@/components/auth/LoginHeader";
import { BackButton } from "@/components/auth/BackButton";
import { MainContainer } from "@/components/MainContainer";
import { FormError } from "@/components/FormError";
import { CardWrapper } from "./CardWrapper";

export function ErrorPage() {
  return (
    <MainContainer>
      <FormError message="Oops! Something went wrong!" />

      <BackButton label="Back to login" href="/auth/login" />
    </MainContainer>
  );
}
