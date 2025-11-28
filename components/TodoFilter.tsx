import {Button} from "@/components/ui/button"
function TodoFilter({setFilter}:any) {
    return (
        <div className="flex gap-4">
            <Button onClick={() => setFilter('all')}>所有记录</Button>
            <Button 
                className="bg bg-green-400"
                onClick={() => setFilter('active')}>待办事项</Button>
            <Button 
                className=" bg-gray-400"
                onClick={() => setFilter('completed')}>已完成</Button>
        </div>
    )
}

export default TodoFilter