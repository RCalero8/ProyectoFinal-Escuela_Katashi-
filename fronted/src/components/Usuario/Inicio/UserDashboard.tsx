import React from 'react';
import '../../../style/Usuario/Inicio/UserDashboard.css';

interface DashboardItem {
    id: number;
    title: string;
    description: string;
    icon: string;
    path: string;
}

const UserDashboard: React.FC = () => {
    const formatTitle = (title: string) => title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

    const items: DashboardItem[] = [
        {
            id: 1,
            title: 'Mis Clases',
            description: 'Ver horarios, próximas clases y sensei asignado,',
            icon: '🥋',
            path: '/usuario/clases'
        }, 
        {
            id: 2,
            title: 'Pagos',
            description: 'Consultar cuotas, historial y método de pago.',
            icon: '💳',
            path: '/pagos'
        }, 
        {
            id: 3,
            title: 'Federación',
            description: 'Ver tu ficha federativa y estado de licencia.',
            icon: '📄',
            path: '/federacion'
        }, 
        {
            id: 4,
            title: 'Tienda',
            description: 'Comprar material o uniformes oficiales.',
            icon: '🛍️',
            path: '/tienda'
        }
    ];

    return (
        <div className="user-dashboard-container">
            <div className="user-dashboard-grid">
                {items.map((item) => (
                    <div key={item.id} className="dashboard-card">
                        <div className="card-header">
                            <span className="card-icon">{item.icon}</span>
                            <h2 className="card-title">{formatTitle(item.title)}</h2>
                        </div>
                        <p className="card-description">{item.description}</p>
                        <a href={item.path} className="card-button">
                            Entrar
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default UserDashboard;