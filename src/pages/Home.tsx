import { Description, Dialog, DialogPanel, DialogTitle, Input } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSession } from "../components/actions";


function Home() {
  const [multiplayerDialogOpen, setMultiplayerDialogiOpen] = useState(false);
  const [multiplayerLink, setMultiplayerLink] = useState("");
  const navigate = useNavigate();

  const handleMultiplayerButtonClick = async () => {
    setMultiplayerDialogiOpen(true)
    const link = await createSession()
    setMultiplayerLink(link)
  }
  return (
    <div className="h-full w-full flex gap-2 items-center justify-center">
      <button onClick={() => navigate("/single")}>
        Single Player
      </button>
      <button onClick={handleMultiplayerButtonClick}>
        Multi Player
      </button>
      <Dialog open={multiplayerDialogOpen} onClose={() => setMultiplayerDialogiOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-md shadow-xl bg-bg p-12 text-fg">
            <DialogTitle className="font-bold">Multi Player Mode</DialogTitle>
            <Description>Send this link to the person you want to play with.</Description>
            <Input
              value={multiplayerLink}
              disabled
              className={
                'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-fg'
              }
            />
            <div className="flex gap-4">
              <button>Copy Link</button>
              <button onClick={() => navigate(`multi/${multiplayerLink}`)}>Next</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default Home
