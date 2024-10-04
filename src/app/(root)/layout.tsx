import Header from "@/components/ui/Header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />

      {children}
    </div>
  );
};

export default Layout;
