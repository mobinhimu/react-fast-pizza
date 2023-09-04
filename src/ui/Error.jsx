import { useRouteError } from "react-router-dom";
import ButtonLink from "./ButtonLink";

function NotFound() {
  const error = useRouteError();

  return (
    <div className="flex  h-screenVH flex-col items-center justify-center gap-4 sm:text-xl">
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <ButtonLink to="-1">&larr; Go back</ButtonLink>
    </div>
  );
}

export default NotFound;
