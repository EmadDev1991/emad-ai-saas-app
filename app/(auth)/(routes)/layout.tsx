interface LayoutProps {
    children: React.ReactNode;
  }
  
  const Layout = ({ children }: LayoutProps) => {
    return <div className="bg-[#111827] h-full flex justify-center items-center">{children}</div>;
  };
  
  export default Layout;
  