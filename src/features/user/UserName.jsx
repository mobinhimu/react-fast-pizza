import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((store) => store.user.username);

  if (!username) return null;

  return (
    <p className="hidden  text-clip text-sm font-semibold md:block">
      {username}
    </p>
  );
}

export default UserName;
