import { goToLogin, sendRequest } from "../../communication/auth";

export const Login = () => {
  return (
    <div>
      <button type="button" onClick={goToLogin}>
        Login
      </button>
      <button
        type="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          sendRequest(e);
        }}
      >
        send request
      </button>
    </div>
  );
};
