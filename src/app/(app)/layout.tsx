import BottomBar from "@/components/app/bottombar/BottomBar";
import BottomBarWrapper from "@/components/app/bottombar/BottomBarWrapper";
import SideBar from "@/components/app/sidebar/SideBar";
import AppProvider from "@/providers/AppProvider";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen flex-col sm:flex-row">
      <SideBar />
      <AppProvider>{children}</AppProvider>
      <BottomBarWrapper bottomBar={<BottomBar />} />
    </div>
  );
};

export default AppLayout;
