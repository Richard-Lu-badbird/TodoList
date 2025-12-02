// components/AddTodo.tsx
import { FormEvent, useState } from "react";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AddTodo({ addTodo }: { addTodo: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleAdd = (e?: FormEvent) => {
    e?.preventDefault();
    if (text.trim() === "") {
      toast.info("请输入待办事项后再提交", {
        cancel: {
          label: '关闭',
          onClick: () => {}
        }
      })
      console.log("测试");
      return;
    }
    addTodo(text);
    setText("");
  };

  return (
    <>
      {/* 表单正常放在外面 */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <Input
          className="flex-1"
          placeholder="添加新的待办事项……"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          className="duration-200 transition-all hover:scale-105 active:scale-95"
        type="submit">新建事项</Button>
      </form>

      {/* AlertDialog 只用于弹窗 */}
      {/* <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>提示</AlertDialogTitle>
            <AlertDialogDescription>
              请输入待办事项后再提交。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>关闭</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>
              确定
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}

export default AddTodo;
