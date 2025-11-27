import {Button} from "@/components/ui/button"
function TodoFilter({setFilter}:any) {
    return (
        <div>
            <Button onClick={() => setFilter('all')}>All</Button>
            <Button onClick={() => setFilter('active')}>Active</Button>
            <Button onClick={() => setFilter('completed')}>Completed</Button>
        </div>
    )
}

export default TodoFilter