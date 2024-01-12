"use client";

import { useCallback, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";

import CardWrapper from "./cardWrapper";
import { newVerification } from "@/actions/verifyEmail";
import FormError from "../../../../components/formError";
import FormSuccess from "../../../../components/formSuccess";

function VerificationEmailForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("No token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => setError("Something went wrong"));
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/login"
      separator={false}
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error ? (
          <Loader2 className="h-10 w-10 animate-spin" />
        ) : null}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}

export default VerificationEmailForm;
