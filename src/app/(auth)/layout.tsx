export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-400 to-orange-800 sm:from-orange-300 sm:to-orange-800">
      {children}
    </div>
  );
}
