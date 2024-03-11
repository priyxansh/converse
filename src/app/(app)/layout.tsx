import SideBar from "@/components/app/SideBar";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen-svh">
      <SideBar />
      {children}
    </div>
  );
};

export default AppLayout;
