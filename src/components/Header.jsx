import { useContext } from "react";
import { UserContext } from "../contexts/contexts";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <>
      <h1>NC News</h1>
      <p>User: {user}</p>
    </>
  );
}
