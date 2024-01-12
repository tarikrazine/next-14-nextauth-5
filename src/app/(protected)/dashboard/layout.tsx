export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="px-6">
        <div className="flex gap-x-4">
          <div className="hidden w-40 shrink-0 md:block">Side navbar</div>
          {children}
        </div>
      </main>
    </>
  );
}
