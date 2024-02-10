import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

type PasswordVisibilityTogglerProps = {
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
};

const PasswordVisibilityToggler = ({
  isPasswordVisible,
  togglePasswordVisibility,
}: PasswordVisibilityTogglerProps) => {
  return (
    <Button
      type="button"
      variant={null}
      size={"icon"}
      onClick={togglePasswordVisibility}
      aria-label="Toggle password visibility"
      className="absolute top-0 right-0"
    >
      {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
    </Button>
  );
};

export default PasswordVisibilityToggler;
