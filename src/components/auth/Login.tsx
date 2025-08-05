import { goToLogin } from "../../communication/auth";

export const Login = () => {
  return (
    <div>
      <button type="button" onClick={goToLogin}>
        Login
      </button>
    </div>
  );
};
