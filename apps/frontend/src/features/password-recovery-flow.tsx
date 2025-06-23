import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordRecoveryPage from "@/features/password-recovery-page";
import VerificationCodePage from "@/polymet/components/verification-code-page";
import ResetPasswordPage from "@/features/reset-password-page";

export default function PasswordRecoveryFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<
    "email" | "verification" | "reset"
  >("email");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle email submission
  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setCurrentStep("verification");
  };

  // Handle verification code submission
  const handleVerifyCode = (code: string) => {
    // In a real app, you would validate the code with an API
    setCurrentStep("reset");
  };

  // Handle password reset
  const handlePasswordReset = (newPassword: string) => {
    // In a real app, you would send the new password to an API
    setIsSuccess(true);

    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // Handle back navigation
  const handleBack = () => {
    if (currentStep === "verification") {
      setCurrentStep("email");
    } else if (currentStep === "reset") {
      setCurrentStep("verification");
    } else {
      navigate("/");
    }
  };

  // Handle resend code
  const handleResendCode = () => {
    // In a real app, you would call an API to resend the code
    console.log("Resending code to", email);
  };

  // Success message after password reset
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Senha alterada com sucesso!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Sua senha foi redefinida. Você será redirecionado para a página de
              login.
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mb-4">
              <div className="bg-blue-600 h-1 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render the appropriate step
  switch (currentStep) {
    case "email":
      return (
        <PasswordRecoveryPage
          onSubmit={handleEmailSubmit}
          onBack={handleBack}
        />
      );

    case "verification":
      return (
        <VerificationCodePage
          email={email}
          onSubmit={handleVerifyCode}
          onBack={handleBack}
          onResend={handleResendCode}
        />
      );

    case "reset":
      return (
        <ResetPasswordPage onSubmit={handlePasswordReset} onBack={handleBack} />
      );

    default:
      return null;
  }
}
