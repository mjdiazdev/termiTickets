import { Users, Bus, MapPin, Ticket } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { label: 'Viajes Hoy', value: '12', icon: <MapPin className="text-blue-600" />, color: 'bg-blue-100' },
        { label: 'Boletos Vendidos', value: '145', icon: <Ticket className="text-green-600" />, color: 'bg-green-100' },
        { label: 'Unidades Activas', value: '8', icon: <Bus className="text-purple-600" />, color: 'bg-purple-100' },
        { label: 'Personal de Turno', value: '10', icon: <Users className="text-orange-600" />, color: 'bg-orange-100' },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                        <div className={`p-4 rounded-xl ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-64 flex items-center justify-center">
                <p className="text-slate-400 italic">Gráfico de ventas (Próximamente...)</p>
            </div>
        </div>
    );
};

export default Dashboard;