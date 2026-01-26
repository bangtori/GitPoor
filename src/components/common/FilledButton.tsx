import type { PropsWithChildren } from "react";

interface ButtonProps {
  disable?: boolean;
  className?: string;
  onClick?: () => void;
}

const FilledButton = ({
  children,
  disable = false,
  onClick,
  className = "",
}: PropsWithChildren<ButtonProps>) => {
  const backgroundClass = disable
    ? "bg-primary-dim cursor-not-allowed"
    : "bg-primary hover:bg-primary-hover cursor-pointer";

  const classes = `w-full mt-6 py-3 font-bold text-text-primary transition-colors duration-200 rounded-xl ${backgroundClass} ${className}`;

  return (
    <button className={classes} disabled={disable} onClick={onClick}>
      {children}
    </button>
  );
};

export default FilledButton;
