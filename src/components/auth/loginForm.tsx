import CardWrapper from "./cardWrapper";

function LoginPage() {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocial
    >
      LoginForm
    </CardWrapper>
  );
}

export default LoginPage;
