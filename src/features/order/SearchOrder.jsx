import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(eve) => {
        eve.preventDefault();
        if (!query) return;
        navigate(`/order/${query}`);
        setQuery("");
      }}
    >
      <input
        type="text"
        placeholder="Enter Your #ID"
        className="input w-48 border-none bg-yellow-100 px-2  py-1  ring-0  ring-1 focus:w-48 focus:outline-none focus:ring-yellow-500 sm:px-2  sm:py-1 sm:focus:w-72"
        value={query}
        onChange={(eve) => setQuery(eve.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
