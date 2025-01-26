import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

function Layout({ onRegisterClick, onLoginClick }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onRegisterClick={onRegisterClick} onLoginClick={onLoginClick} />
      <main className="flex-grow-1">
        <div className="container pt-5">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
