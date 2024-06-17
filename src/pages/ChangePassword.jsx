import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import SideNav from "../components/SideNav";
import RecentUser from "../components/RecentUser";
import Notifcation from "../components/Notification";
import { LogedIn } from "../context/IsLogedIn";
import userIcon from "/img/user.svg";
import styles from "../assets/css/ChangePassword.module.css";

const ChangePassword = () => {
  const { user } = useContext(LogedIn);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const handleClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("/api/user/changePassword", { password })
          .then(() => {
            setMessage("Successfully changed the password");
            setPassword("");
          })
          .catch((e) => {
            setMessage(
              e.response.status === 400
                ? e.response.data
                : "Internal server error"
            );
            Swal.fire({
              title: "error Internal server error",
              text: ".",
              icon: "error",
            });
            setPassword("");
          });
      }
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);
  return (
    <section>
      <SideNav username password log_out />
      <div className={styles.page}>
        {user.profile ? (
          <img src={user.profile} alt="" />
        ) : (
          <svg
            width="100"
            height="110"
            viewBox="0 0 26 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.6115 1.86972C18.7457 1.98136 18.8774 2.09574 19.0075 2.21191C19.0508 2.25045 19.0941 2.28898 19.1388 2.32869C20.7782 3.80506 21.9903 5.86846 22.1068 8.08517C22.2029 10.852 21.536 13.0988 19.6088 15.186C19.2011 15.6095 18.7417 15.9753 18.2764 16.3358C18.3172 16.3557 18.358 16.3756 18.4001 16.3961C19.7807 17.074 20.948 17.8651 22.0942 18.875C22.155 18.9286 22.2159 18.9822 22.2785 19.0374C24.1406 20.7711 25.3312 23.1816 25.8307 25.6196C25.8583 25.7517 25.8583 25.7517 25.8865 25.8864C26.0166 26.5949 26.0051 27.2822 25.9932 28C25.1354 28 24.2776 28 23.3938 28C23.283 27.7835 23.2842 27.5698 23.2643 27.3316C23.0791 25.139 22.3169 23.0668 20.7945 21.4141C20.716 21.3219 20.716 21.3219 20.6359 21.2278C20.2237 20.7508 19.758 20.3645 19.2512 19.9859C19.1869 19.9377 19.1226 19.8895 19.0564 19.8399C17.9708 19.0631 16.801 18.6 15.5147 18.2402C15.4116 18.2114 15.3086 18.1825 15.2024 18.1528C12.6338 17.5691 9.81256 18.1 7.57802 19.4339C6.94996 19.825 6.38582 20.2762 5.84846 20.7793C5.74291 20.8775 5.74291 20.8775 5.63524 20.9777C5.53974 21.0759 5.53974 21.0759 5.44232 21.1761C5.3952 21.2234 5.34808 21.2708 5.29953 21.3196C3.52974 23.167 2.84856 25.5382 2.68054 28C1.79596 28 0.911385 28 0 28C0 26.5123 0 26.5123 0.0913822 25.9965C0.101984 25.9345 0.112586 25.8726 0.123509 25.8088C0.709409 22.6226 2.58654 19.6231 5.28418 17.7262C7.22043 16.4152 7.22043 16.4152 7.79795 16.4152C7.79795 16.3628 7.79795 16.3105 7.79795 16.2565C7.75533 16.2389 7.71271 16.2213 7.66881 16.2032C6.75005 15.7086 6.03001 14.8653 5.44232 14.0348C5.40935 13.9882 5.37638 13.9417 5.34241 13.8938C4.7913 13.0984 4.43313 12.252 4.14266 11.3369C4.11324 11.2447 4.08381 11.1524 4.0535 11.0573C3.44748 8.69492 4.00596 6.22748 5.25194 4.17329C5.51941 3.74903 5.82848 3.37204 6.17338 3.00539C6.2097 2.96655 6.24602 2.92771 6.28344 2.88769C7.49825 1.60282 8.9984 0.74839 10.7222 0.30756C10.8141 0.282193 10.906 0.256827 11.0008 0.230691C13.616 -0.394956 16.4891 0.285068 18.6115 1.86972ZM8.77269 4.19561C8.69395 4.25708 8.61521 4.31856 8.53408 4.38189C7.52026 5.20894 6.74824 6.63691 6.59439 7.91551C6.43102 9.76247 6.71478 11.4523 7.92487 12.9288C8.04356 13.0607 8.16357 13.1915 8.28532 13.3206C8.32909 13.3706 8.37286 13.4207 8.41795 13.4722C9.50893 14.6477 11.2184 15.2192 12.7997 15.2984C14.5227 15.3528 16.0968 14.7389 17.3829 13.638C17.4388 13.591 17.4948 13.5439 17.5524 13.4954C18.7897 12.3775 19.4152 10.7251 19.4946 9.10898C19.4964 7.25814 18.783 5.65878 17.4489 4.33695C16.0655 3.08211 14.4228 2.63054 12.5746 2.66382C11.1601 2.71816 9.83556 3.28968 8.77269 4.19561Z"
              fill="black"
            />
          </svg>
        )}
        {user.name}
        <input
          className={styles.input}
          type="text"
          onChange={handleChange}
          placeholder="New Password"
          value={password}
        />
        <button onClick={handleClick} className={styles.button}>
          Change password
        </button>
      </div>
      <RecentUser />
      {message && <Notifcation message={message} />}
    </section>
  );
};

export default ChangePassword;
