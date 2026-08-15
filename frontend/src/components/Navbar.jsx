import { Link } from "react-router"
import { Moon, PlusIcon, Sun } from "lucide-react"
import { useState,useEffect } from "react"
const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ||'night')
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])
    const handleTheme=()=>{
        setTheme(theme === 'night' ? 'corporate' : 'night')
    }
    return (
    <header className="bg-base-300 border-b border-base/100">
    <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">Notes</h1>
            <div className="flex items-center justify-between gap-32">
                <div className="flex items-center gap-4">
                    <Link to='/create' className="btn btn-primary">
                        <PlusIcon className="size-5"/>
                        <span>New Note</span>
                    </Link>
                </div>
                <div onClick={handleTheme}>
                    {theme === 'night' ? <Sun className="size-5 cursor-pointer hover:opacity-70 transition-opacity"/> : <Moon className="size-5 cursor-pointer hover:opacity-70 transition-opacity"/>}
                </div>
            </div>
        </div>
    </div>
    </header>
  )
}

export default Navbar