import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faPlus,
  faHouse,
  faChartSimple,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../../../redux/store/authSlice";
import profileLogo from "../../../assets/landlord/profileLogo.png";
import accountSecurityImg from "../../../assets/landlord/accountSecurityImg.png";
import { useState } from "react";

export default function LandlordDashboardSidebar({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const [toggelSetting, setToggelSetting] = useState(false);

  const linkStyle_1 =
    "rounded-md px-[14px] py-[10px] max-w-[46px] text-xl flex items-center gap-x-4 cursor-pointer md:max-w-[320px] md:min-h-[45px]";

  const linkStyle_2 =
    "rounded-md px-[14px] py-[10px] flex items-center gap-x-4 cursor-pointer";

  return (
    <>
      <div className="w-[100%] h-[100%] bg-black text-white p-2 flex flex-col lg:p-5">
        <div className="flex sm:flex-col">
          <NavLink
            className={({ isActive }) =>
              ` ${linkStyle_1} ${isActive ? "bg-[#C8A117]" : ""} `
            }
            end
            to="/landlord-dashboard"
          >
            <FontAwesomeIcon icon={faChartSimple} className="text-xl" />
            <span className="hidden md:block md:text-xl">Dashboard</span>
          </NavLink>

          <NavLink
            to="my-properties"
            className={({ isActive }) =>
              ` ${linkStyle_1} ${isActive ? "bg-[#C8A117]" : ""} `
            }
          >
            <FontAwesomeIcon icon={faHouse} className="-ml-[2px] text-xl" />
            <span className="hidden md:block md:text-xl">My Properties</span>
          </NavLink>

          <NavLink
            to="add-properties"
            className={({ isActive }) =>
              ` ${linkStyle_1} ${isActive ? "bg-[#C8A117]" : ""} `
            }
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
            <span className="hidden md:block md:text-xl">Add Property</span>
          </NavLink>

          <div
            className={`rounded-md max-w-[320px] min-h-[45px] text-xl min-[320px]:max-sm:flex cursor-pointer`}
          >
            <div
              className="rounded-md px-[14px] py-[10px] flex items-center gap-x-4 h-[45px]"
              onClick={() => {
                if (toggelSetting) {
                  setToggelSetting(false);
                  navigate("/landlord-dashboard");
                } else {
                  setToggelSetting(true);
                  navigate("settings/profile");
                }
              }}
            >
              <FontAwesomeIcon icon={faGear} className="text-xl" />
              <span className="hidden md:block md:text-xl">Settings</span>
            </div>

            {toggelSetting && (
              <ul className="-ml-1 flex sm:flex-col gap-y-[2px] lg:mt-4 lg:ml-8">
                <li>
                  <NavLink
                    to="settings/profile"
                    className={({ isActive }) =>
                      ` ${linkStyle_2} ${isActive ? "bg-[#C8A117]" : ""} `
                    }
                  >
                    <img className="min-w-5" src={profileLogo} alt="" />
                    <span className="hidden md:block md:text-xl">Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="settings/account-security"
                    className={({ isActive }) =>
                      ` ${linkStyle_2} ${isActive ? "bg-[#C8A117]" : ""} `
                    }
                  >
                    <img className="min-w-5" src={accountSecurityImg} alt="" />
                    <span className="hidden md:block md:text-xl">
                      Account Security
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <div
            className={`rounded-md px-[14px] py-[10px] max-w-[320px] min-min-h-[45px] text-xl text-[#FF0000] flex items-center gap-x-4 cursor-pointer`}
            onClick={() => {
              if (authState.status === true && localStorage.getItem("token")) {
                localStorage.removeItem("token");
                dispatch(logout());
                navigate("/login");
                toast.success("Logged Out!");
              } else {
                toast.error("Please login first!");
              }
            }}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-xl "
            />
            <span className="hidden md:block md:text-xl">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
}
