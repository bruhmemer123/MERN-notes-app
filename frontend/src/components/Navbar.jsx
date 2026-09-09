import { Link } from "react-router"
import { Moon, PlusIcon, Sun, LogOutIcon, UserIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"
const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'night')
    const { user, logout } = useAuthStore();
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])
    const handleTheme = () => {
        setTheme(theme === 'night' ? 'corporate' : 'night')
    }
    return (
        <header className="bg-base-300 border-b border-base/100">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tighter">
                        Notes
                    </Link>
                    <div className="flex items-center gap-4">
                        {user && (
                            <div className="hidden sm:flex items-center gap-2 text-sm text-base-content/80">
                                <UserIcon className="size-4 text-primary" />
                                <span>{user.username}</span>
                            </div>
                        )}
                        <Link to="/create" className="btn btn-primary btn-sm sm:btn-md">
                            <PlusIcon className="size-5" />
                            <span>New Note</span>
                        </Link>
                        <button onClick={handleTheme} className="btn btn-ghost btn-circle btn-sm">
                            {theme === "night" ? (
                                <Sun className="size-5 text-warning" />
                            ) : (
                                <Moon className="size-5" />
                            )}
                        </button>
                        {user && (
                            <button
                                onClick={logout}
                                className="btn btn-ghost btn-sm text-error gap-1"
                                title="Logout"
                            >
                                <LogOutIcon className="size-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar