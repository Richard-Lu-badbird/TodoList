import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Todo } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { FieldSeparator } from "./ui/field";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { toast } from "sonner";

type Picker = "start" | "end" | null;
interface TodoDetailsDialogProps {
  detailOpen: boolean;
  detailTodo: Todo | null;
  updateTodo: (payload: {
    id: number;
    text?: string;
    completed?: boolean;
    startTime?: Date | null;
    endTime?: Date | null;
  }) => void;
  onOpenChange: (open: boolean) => void;
}

function TodoDetailsDialog({
  detailOpen,
  detailTodo,
  updateTodo,
  onOpenChange,
}: TodoDetailsDialogProps) {
  if (!detailTodo) return null;

  const formatDateTime = (value?: string | Date) => {
    if (!value) return "未设置";
    const date = typeof value === "string" ? new Date(value) : value;
    return isNaN(date.getTime()) ? "未设置" : date.toLocaleString();
  };

  const [startDate, setStartDate] = useState<Date | undefined>(
    detailTodo.startTime ? new Date(detailTodo.startTime) : undefined
  );

  const [endDate, setEndDate] = useState<Date | undefined>(
    detailTodo.endTime ? new Date(detailTodo.endTime) : undefined
  );

  const [openPicker, setOpenPicker] = useState<Picker>(null);

  // const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    detailTodo.startTime ? new Date(detailTodo.startTime) : undefined
  );
  const [text, setText] = useState(detailTodo.text);
  const [completed, setCompleted] = useState<boolean>(
    detailTodo.completed ?? false
  );
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = useState<number>();

  useEffect(() => {
    setCompleted(detailTodo.completed);
    // setDate(detailTodo.startTime ? new Date(detailTodo.startTime) : undefined);
    setStartDate(
      detailTodo.startTime ? new Date(detailTodo.startTime) : undefined
    );
    setEndDate(detailTodo.endTime ? new Date(detailTodo.endTime) : undefined);
    setText(detailTodo.text);
    // setOpenDate(false);
    setOpenPicker(null);
  }, [detailTodo]);

  const syncWidth = useCallback(() => {
    if (spanRef.current && inputRef.current) {
      const width = spanRef.current.getBoundingClientRect().width || 1;
      setInputWidth(width);
    }
  }, []);

  useLayoutEffect(() => {
    syncWidth();
  }, [text, detailOpen, syncWidth]);

  const handleSave = () => {
    if (!startDate) {
      toast.error("开始时间不能为空");
      return;
    }

    // endDate 可以为空，不为空时才比较
    if (endDate && startDate.getTime() > endDate.getTime()) {
      toast.error("结束时间不能早于开始时间");
      return;
    }

    updateTodo({
      id: detailTodo.id,
      text,
      completed,
      startTime: startDate ?? null,
      endTime: endDate ?? null,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={detailOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>当前待办的具体信息</DialogDescription>
          <FieldSeparator />
          <span
            ref={spanRef}
            aria-hidden
            className="pointer-events-none fixed -left-[9999px] top-0 whitespace-pre text-xl font-semibold leading-tight px-0"
          >
            {text || " "}
          </span>
          <div className="flex items-center gap-3">
            <Label className="whitespace-nowrap">待办事项</Label>
            <div className="flex flex-1 justify-end">
              <DialogTitle asChild>
                <Input
                  ref={inputRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  aria-label="编辑待办标题"
                  style={{
                    // width: inputWidth ? `${inputWidth}px` : undefined,
                    maxWidth: "200px",
                    paddingRight: "0px",
                    paddingLeft: "10px",
                  }}
                  className="max-w-full border-transparent bg-transparent shadow-none px-0 text-xl font-semibold leading-tight text-right focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                  placeholder="输入待办标题"
                />
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4">
          {/* <FieldSeparator /> */}
          <div className="flex justify-between items-center">
            <Label>状态(是否完成该待办)</Label>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setCompleted((prev) => !prev)}
                className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 
            ${
              completed
                ? "bg-primary border-primary text-white"
                : "border-border hover:border-primary focus:ring-1 focus:ring-primary focus:ring-offset-1"
            }`}
                aria-label={completed ? "标记为未完成" : "标记为已完成"}
              >
                {completed && (
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <span className="text-foreground">
                {completed ? "已完成" : "未完成"}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <Label>开始时间</Label>
            <Popover
              open={openPicker === "start"}
              onOpenChange={(o) => setOpenPicker(o ? "start" : null)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="startDate"
                  className="w-32 justify-between font-normal"
                >
                  <ChevronDownIcon />
                  {startDate
                    ? startDate.toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "选择日期"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  captionLayout="dropdown"
                  startMonth={new Date(2024, 0)}
                  endMonth={new Date(2050, 0)}
                  onSelect={(date) => {
                    // setDate(date);
                    setStartDate(date || undefined);
                    // setOpenDate(false);
                    setOpenPicker(null);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex justify-between">
            <Label>结束时间</Label>
            <Popover
              open={openPicker === "end"}
              onOpenChange={(o) => setOpenPicker(o ? "end" : null)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="endDate"
                  className="w-32 justify-between font-normal"
                >
                  <ChevronDownIcon />

                  {endDate
                    ? endDate.toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "选择日期"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  startMonth={new Date(2024, 0)}
                  endMonth={new Date(2050, 0)}
                  selected={endDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    // setDate(date);
                    // setOpenDate(false);
                    setEndDate(date);
                    setOpenPicker(null);
                    console.log(date);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">取消</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSave}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TodoDetailsDialog;
