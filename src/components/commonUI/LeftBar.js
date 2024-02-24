import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { getMenuAction } from "../../redux/slice/menu/getMenuSlice";

const LeftBar = ({ toggleMenu }) => {
  const dispatch = useDispatch();
  const params = useLocation()
  console.log("qq",params.pathname);
  const menu = useSelector((state) => state.menu);
  const [activeSubMenu, setActiveSubMenu] = useState();

  useEffect(() => {
    dispatch(getMenuAction());
  }, []);

  const handleSubMenuToggle = (index) => {
    console.log("index",index);
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  console.log();

  
  return (
    <div className={toggleMenu ? "leftBar partialLeftBar" : "leftBar"}>
      {menu?.modules?.map((menuItem, index) => (
        <>
          {menuItem.slug === "setting" ? (
          <>  <a onClick={() => handleSubMenuToggle(index)} className={params.pathname === "/analytics" ? "qwerty":""}>
              <i className={menuItem.iconTag}></i>
              <span>{menuItem.moduleName} </span> 
              <div className="drop"><i class={activeSubMenu ? "fa-solid fa-chevron-up": "fa-solid fa-chevron-down"} id="dropDonMenu"></i></div>
            </a>
            {activeSubMenu === index && (
                <>
                  {menuItem.childArray.map((subItem, subIndex) => (
                    <NavLink to={subItem.slug} key={subIndex}>
                      <i className={subItem.iconTag}></i>
                      <span>{subItem.moduleName}</span>
                    </NavLink>
                  ))}
                </>
              )}</>
          ) : (
            <NavLink to={menuItem.slug} key={index}>
              <i className={menuItem.iconTag}></i>
              <span>{menuItem.moduleName}</span>
            </NavLink>
          )}
        </>
      ))}
    </div>
  );
};

export default LeftBar;












// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { getMenuAction } from "../../redux/slice/menu/getMenuSlice";

// const LeftBar = ({ toggleMenu }) => {
//   const dispatch = useDispatch();
//   const menu = useSelector((state) => state.menu);

//   useEffect(() => {
//     dispatch(getMenuAction());
//   }, []);

//   return (
//     <div className={toggleMenu ? "leftBar partialLeftBar" : "leftBar"}>
//       {menu?.modules?.map((menu, index) => {
//         return (
//           <NavLink to={menu.slug === "setting" ? "":menu.slug} key={index}>
//             <i className={menu.iconTag}></i>
//             <span>{menu?.moduleName}</span>
//           </NavLink>
//         );
//         // }
//       })}
    
//     </div>
//   );
// };

// export default LeftBar;

// const wpmsMenu = {
//   menuName: "WPMS",
//   menuIcon: "/icons-images/patients.svg",
//   menuURL: "/wpms",
//   submenu: [
//     {
//       name: "WPMS",
//       icon: "/icons-images/patients.svg",
//       url: "/wpms",
//     },
//     {
//       name: "Appointed Doctor",
//       icon: "/icons-images/patients.svg",
//       url: "/appointed-doctor",
//     },
//   ],
// };
  {/* <NavLink to="/dashboard">
        <i className="fa-solid fa-gauge-high"></i>
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/users">
        <i className="fa-solid fa-users"></i>
        <span>Users</span>
      </NavLink>

      <NavLink to="/uac">
        <i className="fa-solid fa-sliders"></i>
        <span>UAC</span>
      </NavLink>

      <NavLink to="/settings">
        <i className="fa-solid fa-gear"></i>
        <span>Settings</span>
      </NavLink> */}