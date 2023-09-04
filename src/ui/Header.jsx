import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <div className="flex items-center justify-between bg-yellow-400 p-4 text-base uppercase ">
      <Link to="/" className="tracking-widest">
        React Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </div>
  );
}

export default Header;
