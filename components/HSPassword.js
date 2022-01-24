import styles from './HSPassword.module.css'
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
export default function ShowHidePassword({ showPassword, toggle }) {
  return (
    <>
      {showPassword ? (
        <RiEyeLine
          onClick={() => {
            toggle(!showPassword);
            document.querySelector("#password_field").focus();
          }}
          className={`${styles.open_eye}`}
        />
      ) : (
        <RiEyeCloseLine
          onClick={() => {
            toggle(!showPassword);
            document.querySelector("#password_field").focus();
          }}
        />
      )}
    </>
  )
}