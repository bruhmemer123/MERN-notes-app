import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { formatDate } from "../lib/utils.js"
import api from "../lib/axios"
import toast from "react-hot-toast"
const NoteCard = ({note,setNotes}) => {
    const handleDelete=async (id)=>{

        if(!window.confirm("Are you sure you want to delete this note?")){
            return
        }
        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev)=> prev.filter((note)=>note._id!==id))
            toast.success("Note deleted successfully!")
        } catch {
            toast.error("Failed to delete note")
        }
    }
  return (
    <div
    className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#01b7e5]">
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-base-content/60 text-sm">{formatDate(new Date(note.createdAt))}</span>
                <div className="flex items-center gap-1">
                    <Link to={`/note/${note._id}`}>
                        <PenSquareIcon className="size-4 text-primary"/>
                    </Link>
                    <button className="btn btn-ghost btn-xs text-error" onClick={()=>handleDelete(note._id)}>
                        <Trash2Icon className="size-4"/>
                    </button>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default NoteCard