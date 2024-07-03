import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/auth.ts";
import { AuthError } from "next-auth";
import { FcGoogle } from "react-icons/fc";

const providerIcons = {
  google: FcGoogle
  // Add other providers and their respective icons here
};

export default async function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-purple-400 px-4">
      <div className="w-full max-w-md transform space-y-6 rounded-lg bg-gradient-to-r from-pink-200 to-red-200 p-8 shadow-xl transition duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Sign In
        </h2>
        <p className="text-center text-gray-600">
          Choose your provider to sign in
        </p>
        {Object.values(providerMap).map((provider) => {
          const Icon = providerIcons[provider.id];
          return (
            <form
              key={provider.name}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id);
                } catch (error) {
                  if (error instanceof AuthError) {
                    // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                    console.error(error)
                  }
                  throw error;
                }
              }}
              className="flex justify-center">
              <button
                type="submit"
                className="mt-2 flex w-full transform items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 px-4 py-3 text-white transition duration-200 ease-in-out hover:scale-105 hover:from-pink-600 hover:to-red-600">
                {Icon && <Icon className="text-2xl" />}
                <span className="font-medium">
                  Sign in with {provider.name}
                </span>
              </button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
