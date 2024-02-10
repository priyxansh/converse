type ButtonContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

const ButtonContainer = ({ children, className }: ButtonContainerProps) => {
  return (
    <div
      className={`flex flex-wrap gap-2 justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
};

export default ButtonContainer;
