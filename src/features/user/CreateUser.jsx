import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { createUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createUser(username));
    setUsername("");
    navigation("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-6 mt-6 md:mt-10">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        className="input mb-8 w-72 sm:w-96"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
