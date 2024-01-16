import SideBar from "./components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full">
      <div className="fixed inset-y-0 z-30 hidden h-full w-52 flex-col bg-slate-50 pt-14 md:flex dark:bg-[#1F1F1F]">
        <SideBar />
      </div>
      <div className="h-full pb-3 md:pl-52">{children}</div>
    </main>
  );
}
