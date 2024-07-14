import { MousePointer2 } from "lucide-react";

type MessageArrowProps = {
  isSentByUser: boolean;
};

const MessageArrow = ({ isSentByUser }: MessageArrowProps) => {
  return (
    <div
      className={`absolute top-[-1px] rotate-[45deg] ${
        isSentByUser ? "right-[-5px]" : "left-[-5px]"
      }`}
    >
      <MousePointer2
        size={12}
        style={{
          fill: isSentByUser ? "hsl(var(--primary))" : "hsl(var(--accent))",
          stroke: isSentByUser ? "hsl(var(--primary))" : "hsl(var(--accent))",
          transform: `${isSentByUser ? "rotate(90deg)" : "rotate(-90deg)"}`,
        }}
      />
    </div>
  );
};

export default MessageArrow;
