import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback", //get credentials from google and redirect to callback page
      redirectUrlComplete: "/auth-callback",
    });
  };

  const signInWithGithub = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_github",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <>
      <Button
        onClick={signInWithGoogle}
        variant={"secondary"}
        className="w-full text-white border-zinc-200 h-11"
      >
        {/* <img src="/google.png" alt="Google" className="size-5" /> */}
        Continue with Google
      </Button>

      <Button
        onClick={signInWithGithub}
        variant={"secondary"}
        className="w-full text-white border-zinc-200 h-11"
      >
        {/* <img src="/google.png" alt="Google" className="size-5" /> */}
        Continue with Github
      </Button>
    </>
  );
};

export default SignInOAuthButtons;
