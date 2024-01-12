function LoginSeparator() {
  return (
    <div className="relative mx-auto mb-4 w-[280px]">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-foreground" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-foreground">
          Or continue with
        </span>
      </div>
    </div>
  );
}

export default LoginSeparator;
