import { Link } from "react-router-dom";

function Button({ children, disabled, to }) {

  const btnClasses = "bg-yellow-400 uppercase px-4 py-3 sm:px-6 sm:py-4 text-sm font-semibold text-stone-800 tracking-wide inline-block rounded-fullhover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  if (to) {
    return (
      <Link
        to={to}
        className={btnClasses}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={btnClasses}
    >
      {children}
    </button>
  );
}

export default Button;