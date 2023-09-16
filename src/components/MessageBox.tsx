import useMessage from "../hooks/useMessage";
import { SendHorizontal } from "lucide-react";
import { debounce } from "lodash";

const TIMEOUT_TYPING = 4000;

interface MessageBoxProps {
  pushMessage: (message: string) => void;
  setUserTyping: (typing: boolean) => void;
}

function MessageBox({ pushMessage, setUserTyping }: MessageBoxProps) {
  const timeoutUserTyping = debounce(() => {
    setUserTyping(false);
  }, TIMEOUT_TYPING);

  const { messageBoxProps, submit, showPlaceholder } = useMessage({
    clearOnSubmit: true,
    submitHook: (message: string) => {
      console.log("[message]", message);
      pushMessage(message);
    },
    messageChangeHook: (message: string) => {
      if (message.length > 0) {
        setUserTyping(true);
        timeoutUserTyping();
      }
    },
  });
  return (
    <div className="relative w-full">
      <div
        data-about="message-box"
        className="min-h-[52px] w-full overflow-hidden text-ellipsis rounded-3xl border-2 border-slate-200 bg-slate-100 p-3 pr-11 outline-blue-400"
        {...messageBoxProps}
      />
      {showPlaceholder && (
        <p className="pointer-events-none absolute left-0.5 top-0.5 p-3 italic text-slate-400">
          Send a message
        </p>
      )}
      <SendHorizontal
        className="absolute bottom-1.5 right-1.5 h-10 w-10 overflow-visible rounded-full bg-blue-600 p-2 text-white"
        onClick={submit}
      />
    </div>
  );
}

export default MessageBox;
