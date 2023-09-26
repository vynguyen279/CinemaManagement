import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/share.css";

function Layout({ children, title, pos }) {
  return (
    <>
      <Header title={title} pos={pos}></Header>
      <div
        className="frame-admin"
        style={{
          width: "100%",
          height: window.innerHeight - 60,
        }}
      >
        {/* <Tab key={key} /> */}
        <Sidebar />
        {children}
      </div>
    </>
  );
}

export default Layout;
