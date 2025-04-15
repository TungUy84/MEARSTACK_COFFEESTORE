import React, { Fragment, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { privateRoutes } from "./routes/index.jsx";
import DefaultLayout from "./layout/DefaultLayout.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Auth/Login/Login";
import Signin from "./pages/Auth/Signin/Signin";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init(); // Khởi tạo AOS
  }, []);

  // Danh sách các đường dẫn không hiển thị Navbar và Footer
  const noLayoutPaths = ["/login", "/signin"];

  // Kiểm tra nếu đường dẫn hiện tại nằm trong danh sách noLayoutPaths
  const shouldShowLayout = !noLayoutPaths.includes(location.pathname);

  return (
    <>
      {/* Hiển thị Navbar nếu không nằm trong danh sách noLayoutPaths */}
      {shouldShowLayout && <Navbar />}

      <Routes>
        {/* Định nghĩa riêng cho Login và Signin */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />

        {/* Các route khác */}
        {privateRoutes.map((route, index) => {
          const Page = route.element;

          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>

      {/* Hiển thị Footer nếu không nằm trong danh sách noLayoutPaths */}
      {shouldShowLayout && <Footer />}
    </>
  );
};

export default App;