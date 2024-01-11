interface EmailTemplateProps {
  name: string;
  confirmLink?: string;
  token?: string;
}

function EmailTemplate(props: EmailTemplateProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome, {props.name}!</h1>
      <p className="my-4 no-underline">
        {props.token ? (
          <p className="text-lg font-bold">Your 2FA code: {props.token}</p>
        ) : (
          <a href={props.confirmLink}>Click here</a>
        )}
      </p>
    </div>
  );
}

export default EmailTemplate;
