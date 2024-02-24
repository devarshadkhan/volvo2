import DashHeader from "../commonUI/DashHeader";
import { Outlet } from "react-router-dom";

const HeaderLayout = (props) => {
  return (
    <>
      <DashHeader {...props} />
      <Outlet />
    </>
  );
};

export default HeaderLayout;
