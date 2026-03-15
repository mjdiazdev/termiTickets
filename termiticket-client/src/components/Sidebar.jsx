import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Bus, Ticket, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/personal', name: 'Personal', icon: <Users size={20} /> },
        { path: '/vehiculos', name: 'Vehículos', icon: <Bus size={20} /> },
        { path: '/ventas', name: 'Ventas', icon: <Ticket size={20} /> },
    ];

    return (
        <div className="w-64 bg-slate-900 h-full flex flex-col text-slate-300">
            <div className="p-6 text-white text-2xl font-bold tracking-wider border-b border-slate-800">
                TERMI<span className="text-blue-500">TICKET</span>
            </div>
            
            <nav className="flex-1 mt-6 px-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                            location.pathname === item.path 
                            ? 'bg-blue-600 text-white' 
                            : 'hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <button 
                onClick={logout}
                className="m-4 flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all text-slate-400"
            >
                <LogOut size={20} />
                <span className="font-medium">Cerrar Sesión</span>
            </button>
        </div>
    );
};

export default Sidebar;