import { cn } from "@/lib/utils";
import { useState } from "react";

interface TextareaProps {
  name: string;
  id: string;
  cols: number;
  rows: number;
  placeholder: string;
  maxLength: number;
  value: string;
  className: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  name,
  id,
  cols,
  rows,
  placeholder,
  maxLength,
  value,
  className,
  onChange,
}: TextareaProps) => {
  const [numbText, setNumbText] = useState(value ? value.length : 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNumbText(e.target.value.length);
    onChange(e);
  };

  return (
    <div className="relative w-full flex flex-col items-center m-auto gap-1">
      <textarea
        name={name}
        id={id}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        className={cn(
          "w-full rounded-md border border-input bg-secondary/80 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 break-words",
          className
        )}
        onChange={handleChange}
        required
      ></textarea>
      <span className="absolute right-2 bottom-2 w-full text-xs text-end ">
        {numbText < maxLength / 2 ? (
          <span className="text-green-500">
            {numbText}/{maxLength}
          </span>
        ) : numbText < maxLength ? (
          <span className="text-yellow-500">
            {numbText}/{maxLength}
          </span>
        ) : (
          <span className="text-red-500">
            {numbText}/{maxLength}
          </span>
        )}
      </span>
    </div>
  );
};

export default Textarea;
