import { KeyboardEventHandler, useMemo, useRef, useState } from "react";

interface UseMessageProps {
  clearOnSubmit?: boolean;
  submitHook?: (message: string) => void;
  messageChangeHook?: (message: string) => void;
}

function useMessage(props?: UseMessageProps) {
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const submit = () => {
    if (props?.submitHook) {
      props.submitHook(getMessage());
    }
    if (props?.clearOnSubmit) {
      clearMessage();
    }
  };
  const startEditing = () => {
    if (!messageBoxRef.current) return;
    messageBoxRef.current.contentEditable = "true";
    messageBoxRef.current.focus();
  };

  const stopEditing = () => {
    if (!messageBoxRef.current) return;
    messageBoxRef.current.contentEditable = "false";
  };
  const clearMessage = () => {
    console.log("[clear message]");
    messageBoxRef.current && (messageBoxRef.current.innerHTML = "");
    props?.messageChangeHook && props.messageChangeHook("");
  };
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    // handle enter
    if (!event.shiftKey && event.key === "Enter") {
      console.log("[enter]");
      event.preventDefault();
      submit();
    }
  };

  const getMessage = () => {
    if (!messageBoxRef.current) return "";
    return messageBoxRef.current.innerHTML;
  };
  const object = useMemo(() => ({
    messageBoxProps: {
      ref: messageBoxRef,
      onTouchStart: startEditing,
      onClick: startEditing,
      onBlur: stopEditing,
      onKeyDown: handleKeyDown,
      onKeyUp: () => {
        const message = getMessage();
        props?.messageChangeHook && props.messageChangeHook(message);
        if (message.length === 0) {
          setShowPlaceholder(true);
        } else {
          setShowPlaceholder(false);
        }
      },
    },
    clearMessage,
    getMessage,
    submit,
    showPlaceholder,
  }), [showPlaceholder]);

  return object;
}
export default useMessage;
