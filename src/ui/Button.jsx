import { Link } from "react-router-dom";

function Button({ children, disabled, to, size }) {

  const base = "bg-yellow-400 uppercase font-semibold text-stone-800 tracking-wide inline-block rounded-fullhover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",

  };

  if (to) {
    return (
      <Link
        to={to}
        className={styles[size]}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={styles[size]}
    >
      {children}
    </button>
  );
}

export default Button;