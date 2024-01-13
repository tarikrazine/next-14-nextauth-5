export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full items-center justify-center bg-slate-50 dark:bg-[#1F1F1F]">
      {children}
    </div>
  );
}
