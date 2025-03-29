import { Gift } from "lucide-react";
import Container from "./container";
import { Button } from "./ui/button";
import { AuthDialog } from "./dialogs/auth-dialog";

export default function Locked() {
  return (
    <Container className="grid place-items-center h-full w-full">
      <div className="text-center flex flex-col items-center py-6 px-8 rounded-md bg-zinc-900/20 border-1 border-dashed border-zinc-900">
        <Gift size={40} color="#ee6711" />
        <h1 className="text-lg font-medium my-4">Account Needed</h1>
        <p className="text-gray-300 mb-4 text-sm">
          Please login in order to access this page
        </p>
        <AuthDialog>
          <Button className="bg-[#ee6711] hover:bg-[#ee671180] transition-all rounded-md hover:rounded-[2rem]">
            Login to proceed
          </Button>
        </AuthDialog>
      </div>
    </Container>
  );
}
