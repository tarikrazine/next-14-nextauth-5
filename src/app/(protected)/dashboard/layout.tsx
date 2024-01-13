import SideBar from "./components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full">
      <div className="flex h-full gap-x-4">
        <div className="w-50 hidden shrink-0 md:block">
          <SideBar />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
