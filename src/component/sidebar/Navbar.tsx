import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";

export default function Navbar() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "70px 1fr 80px",
        gridTemplateColumns: "auto 1fr  ",
        gridTemplateAreas: `
          'sidebar header '
          'sidebar content '
          'sidebar footer '
      `,
        backgroundColor: "#f3f3f9",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div style={{ gridArea: "sidebar", minHeight: "100vh" }}>
        <img
          src="logo-removebg-preview.png"
          alt=""
          style={{ maxWidth: "250px" }}
        />

        <SideBar />
      </div>

      <div
        style={{
          gridArea: "header",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <div className="navbar-header">header</div>
      </div>
      <div
        style={{
          gridArea: "content",
          overflowY: "hidden",
          overflowX: "auto",
          width: "100%",
          padding: "12px 5px",
          display: "grid",
          gridTemplateRows: "auto auto  1fr",
        }}
      >
        <Outlet />
      </div>
      <footer
        style={{
          backgroundColor: " #ffffff",
          marginTop: "10px",
          gridArea: "footer",
        }}
      >
        <div className="d-flex col-sm pb-md-row footer__clz"></div>{" "}
      </footer>
    </div>
  );
}
