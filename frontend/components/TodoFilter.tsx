import { Button } from "@/components/ui/button"
import type { Filter } from "@/types"
import type { Dispatch, SetStateAction } from "react"

type TodoFilterProps = {
    filter: Filter
    counts: Record<Filter, number>
    setFilter: Dispatch<SetStateAction<Filter>>
}

function TodoFilter({filter, counts, setFilter}: TodoFilterProps) {
    return (
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <Button 
                variant="ghost"
                className={`px-4 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 
                    ${filter === 'all' 
                        ? 'bg-slate-300 text-slate-900 ring-2 ring-slate-400 hover:bg-slate-300' 
                        : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}
                onClick={() => setFilter('all')}>所有记录（{counts.all}）</Button>
            <Button 
                variant="ghost"
                className={`px-4 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 
                    ${filter === 'active' 
                        ? 'bg-amber-300 text-amber-950 ring-2 ring-amber-400 hover:bg-amber-300' 
                        : 'bg-amber-200 text-amber-900 hover:bg-amber-300'}`}
                onClick={() => setFilter('active')}>待办事项（{counts.active}）</Button>
            <Button 
                variant="ghost"
                className={`px-4 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 
                    ${filter === 'completed' 
                        ? 'bg-emerald-300 text-emerald-950 ring-2 ring-emerald-400 hover:bg-emerald-300' 
                        : 'bg-emerald-200 text-emerald-900 hover:bg-emerald-300'}`}
                onClick={() => setFilter('completed')}>已完成（{counts.completed}）</Button>
        </div>
    )
}


export default TodoFilter;
