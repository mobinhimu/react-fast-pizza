import { Link } from "react-router-dom";

function Button({ children, disabled, type, to, onClick }) {
  const className =
    "rad rounded-full bg-yellow-400  font-semibold uppercase text-stone-800  transition-colors duration-200 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: className + " sm:px-6 sm:py-3 px-4 text-sm py-2",
    small: className + " text-xs sm:px-7 sm:py-3 px-3 py-2",
    rounded: className + " px-3 py-1 ",
    clear:
      "rad focus:ring-offset-2disabled:cursor-not-allowed ml-8  rounded-full border-2 border-stone-300 px-4 py-2  text-sm font-semibold uppercase tracking-wide text-stone-500 transition-colors  duration-200 hover:bg-stone-400 hover:text-stone-900 focus:text-stone-900 focus:outline-none focus:ring focus:ring-stone-400  focus:ring-offset-2 sm:px-6 sm:py-3",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
