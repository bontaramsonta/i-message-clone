import { cn } from "@/lib/utils";

interface MessageProps {
  id: number;
  author: string;
  content: string;
  date?: Date;
  own: boolean;
  isDM?: boolean;
  isDeleted?: boolean;
}

function Message({
  own,
  author,
  content,
  date = new Date(),
  isDM = true,
  isDeleted = false,
}: MessageProps) {
  return (
    <li className="w-full list-none py-1.5">
      <div
        className={cn(
          "flex w-fit min-w-[40%] max-w-[80%] flex-col space-y-0.5 rounded-xl px-3 py-1",
          {
            "float-right rounded-br-none bg-blue-700 text-white": own,
            "rounded-bl-none bg-slate-200": !own,
            "opacity-50": isDeleted,
          },
        )}
      >
        {!isDM && (
          <p
            about="author"
            className={cn("text-xs text-slate-600", { "text-slate-300": own })}
          >
            {author}
          </p>
        )}
        {isDeleted ? (
          <p className="italic">message deleted</p>
        ) : (
          <div className="">
            <p
              dangerouslySetInnerHTML={{ __html: content }}
              className="leading-tight"
            ></p>
          </div>
        )}
        <p
          about="author"
          className={cn("text-xs text-slate-600", { "text-slate-300": own })}
        >
          {date.toLocaleTimeString("en-IN", {
            timeStyle: "short",
          })}
        </p>
      </div>
    </li>
  );
}

export default Message;
