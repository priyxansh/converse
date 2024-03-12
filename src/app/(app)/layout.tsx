import BottomBar from "@/components/app/bottombar/BottomBar";
import SideBar from "@/components/app/sidebar/SideBar";
import AppProvider from "@/providers/AppProvider";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen-svh flex-col sm:flex-row">
      <SideBar />
      <AppProvider>{children}</AppProvider>
      <BottomBar />
    </div>
  );
};

export default AppLayout;
