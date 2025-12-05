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

interface TodoDetailsDialogProps {
  detailOpen: boolean;
  detailTodo: Todo | null;
  onOpenChange: (open: boolean) => void;
}

function TodoDetailsDialog({ detailOpen, detailTodo, onOpenChange }: TodoDetailsDialogProps) {
  const formatDateTime = (value?: string | Date) => {
    if (!value) return "未设置";
    const date = typeof value === "string" ? new Date(value) : value;
    return isNaN(date.getTime()) ? "未设置" : date.toLocaleString();
  };
  return (
    <Dialog
      open={detailOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{detailTodo?.text || ""}</DialogTitle>
          <DialogDescription>查看当前待办的具体信息</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">内容</span>
            <span className="text-foreground">{detailTodo?.text || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">状态</span>
            <span className="text-foreground">
              {detailTodo?.completed ? "已完成" : "未完成"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">开始时间</span>
            <span className="text-foreground">
              {detailTodo ? formatDateTime(detailTodo.startTime) : "未设置"}
            </span>
          </div>
        </div>
        <DialogFooter>
            <DialogClose>
                <Button variant="outline">取消</Button>
            </DialogClose>
            <Button type="submit">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TodoDetailsDialog;
