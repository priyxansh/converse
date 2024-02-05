import Container from "@/components/global/Container";
import Header from "@/components/overview/Header";

type OverviewLayoutProps = {
  children: React.ReactNode;
};

const OverviewLayout = ({ children }: OverviewLayoutProps) => {
  return (
    <>
      <Header />
      <main className="px-4">
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default OverviewLayout;
