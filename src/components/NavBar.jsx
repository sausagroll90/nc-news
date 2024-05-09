import { Link } from "react-router-dom";

export default function NavBar({ setError }) {
  return (
    <ul>
      <li>
        <Link to="" onClick={() => setError(null)}>
          Home
        </Link>
      </li>
    </ul>
  );
}
