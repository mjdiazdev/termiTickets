import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
    const { user } = useAuth();

    // Si no hay usuario, lo mandamos al login
    if (!user) return <Navigate to="/login" />;

    return (
        <div className="flex h-screen bg-slate-100">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-slate-800">Panel de Control</h2>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                        <span className="text-sm text-slate-500">Usuario:</span>
                        <span className="ml-2 font-medium text-slate-800">{user.nombre}</span>
                    </div>
                </header>
                <Outlet /> {/* Aquí se renderizarán los módulos (Personal, Vehículos, etc) */}
            </main>
        </div>
    );
};

export default MainLayout;