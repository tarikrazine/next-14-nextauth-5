interface EmailTemplateProps {
  name: string;
  confirmLink: string;
}

function EmailTemplate({ name, confirmLink }: EmailTemplateProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome, {name}!</h1>
      <p className="my-4 no-underline">
        <a href={confirmLink}>Click here to confirm your email</a>
      </p>
    </div>
  );
}

export default EmailTemplate;
