import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const LayoutHF = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutHF;
