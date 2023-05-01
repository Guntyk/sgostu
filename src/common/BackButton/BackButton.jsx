import { useHistory } from "react-router-dom";
import Button from "../Button/Button";

export default function BackButton({ className }) {
  const { goBack } = useHistory();
  return (
    <Button
      buttonText={
        <svg
          cursor="pointer"
          width="30px"
          height="30px"
          fill="#000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M7 239c-9.4 9.4-9.4 24.6 0 33.9L143 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-95-95L488 280c13.3 0 24-10.7 24-24s-10.7-24-24-24L81.9 232l95-95c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 239z" />
        </svg>
      }
      className={`back-link ${className}`}
      onClick={goBack}
    />
  );
}
