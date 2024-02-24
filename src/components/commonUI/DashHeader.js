import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddUser from "../../pages/Users/AddUser";
import Confirm from "./Confirm";
import { useDispatch, useSelector } from "react-redux";
import { signoutAction } from "../../redux/slice/auth/signoutSlice";
import { getUserByIdAction } from "../../redux/slice/users/getUserByIdSlice";
import { getCurrentUserLT, handleFullName } from "../../utils/utils";
import { getUserByTokenAction } from "../../redux/slice/users/getUserByTokenSlice";

const DashHeader = ({ setToggleMenu }) => {
  const [showControls, setShowControls] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [u, setU] = useState({});

  const userByToken = useSelector((state) => state.userByToken);
  const updateProfile = useSelector((state) => state.updateProfile);
  const loggedinUser = useSelector((state) => state.loggedinUser);
  const signout = useSelector((state) => state.signout);

  const dispatch = useDispatch();

  const modalRef = useRef();
  const navigate = useNavigate();
  const [routeFlag, setRouteFlag] = useState(false);

  const user = getCurrentUserLT();
  // const u = userById.user;

  useEffect(() => {
    user.accessToken && dispatch(getUserByTokenAction());
  }, [updateProfile.success, loggedinUser.success]);

  useEffect(() => {
    if (userByToken.success) setU(userByToken.user);
  }, [userByToken.success]);

  // handling minor modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowControls(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // handling full screen mode toggle
  useEffect(() => {
    if (document.fullscreenElement === null && fullScreen) {
      document.body.requestFullscreen();
    } else if (document.fullscreenElement !== null && !fullScreen) {
      document.exitFullscreen();
    }
  }, [fullScreen]);

  const handleFullscreenChange = () => {
    setFullScreen(document.fullscreenElement !== null);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    routeFlag && signout.success && navigate("/");
  }, [signout.success]);

  function handleLogout() {
    dispatch(signoutAction());
    setRouteFlag(true);
  }

  const fullName =
    u?.fname || u?.lname ? u?.fname + " " + u?.lname : "Loading...";
  return (
    <>
      <AddUser
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        title="Edit Profile"
        type="profile"
      />
      <Confirm
        isOpen={openConfirm}
        setIsOpen={setOpenConfirm}
        onClose={() => setOpenConfirm(false)}
        message="Are you Sure?"
        messageDesc={"You will have to login again to access"}
        handleConfirm={handleLogout}
        buttonTitle="Log out"
      />
      <header className="dashHeader">
        <div className="left">
          <Link to="/">
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/icons-images/logo.png`}
            />
          </Link>
          <i
            className="fa-solid fa-bars white-color"
            onClick={() => setToggleMenu((state) => !state)}
          ></i>
        </div>

        <div className="middle">
          <div className="dashSearch"></div>

          <div className="btns">
            <button
              className="maximize center"
              role="button"
              onClick={() => {
                setFullScreen(!fullScreen);
              }}
            >
              <img
                src={
                  !fullScreen
                    ? process.env.PUBLIC_URL + "/icons-images/fullscreen.svg"
                    : process.env.PUBLIC_URL + "/icons-images/exitFscreen.svg"
                }
                alt="open close icon"
              />
            </button>

            {/* <button>
              <img
                src={`${process.env.PUBLIC_URL}/icons-images/notifications.svg`}
                alt="notifications"
              />
            </button> */}
          </div>
        </div>

        <div
          className="right"
          onClick={() => setShowControls(!showControls)}
          // onBlur={() => setShowControls(false)}
          role="button"
        >
          <span className="username">
            {handleFullName({ fullName, fname: u?.fname, lname: u?.lname }) ||
              "Loading..."} 
          </span>
          <div className="profilePicture">
            <img
              src={
                u?.profileImage ||
                `${process.env.PUBLIC_URL}/icons-images/Profileimage.png`
              }
              alt=""
            />
          </div>

          <div className="menu">
            <img
              src={`${process.env.PUBLIC_URL}/icons-images/menuIcon.svg`}
              alt=""
            />
          </div>

          {showControls && (
            <ul className="controls" ref={modalRef} id="modal">
              <li
                className="result"
                onClick={() => {
                  setIsOpen(true);
                  dispatch(getUserByTokenAction());
                }}
              >
                <i className="fa-solid fa-user-pen"></i> Edit Profile
              </li>

              <li
                className="result"
                onClick={() => navigate("/change-password")}
              >
                <i className="fa fa-cog" aria-hidden="true"></i> Change password
              </li>

              <li className="result" onClick={() => setOpenConfirm(true)}>
                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
              </li>
            </ul>
          )}
        </div>
      </header>
    </>
  );
};

export default DashHeader;
