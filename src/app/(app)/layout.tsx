import BottomBar from "@/components/app/bottombar/BottomBar";
import SideBar from "@/components/app/sidebar/SideBar";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen-svh flex-col sm:flex-row">
      <SideBar />
      {children}
      <BottomBar />
    </div>
  );
};

export default AppLayout;
