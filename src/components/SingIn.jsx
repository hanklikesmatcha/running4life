// eslint-disable-next-line import/no-unresolved
import { signIn } from "next-auth/react";
 
export function SignIn() {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => signIn("github", { redirectTo: "/"} )}
        className="btn btn-primary"
      >
        Sign in
      </button>
    </div>
  );
}