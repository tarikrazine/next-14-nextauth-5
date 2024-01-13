import SideBar from "./components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full">
      <div className="flex h-full gap-x-4">
        <div className="hidden w-40 shrink-0 md:block">
          <SideBar />
        </div>
        {children}
      </div>
    </main>
  );
}
