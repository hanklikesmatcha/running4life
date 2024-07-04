// eslint-disable-next-line import/no-unresolved
import { signOut } from "next-auth/react" 

export function SignOut() {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => signOut()}
        className="btn btn-secondary"
      >
        Sign Out
      </button>
    </div>
  );
}