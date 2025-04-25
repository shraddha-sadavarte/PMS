import React from 'react';
import DashboardCharts from '../components/DashboardCharts';
import AdminNavbar from '../components/AdminNavbar';

const Dashboard = () => {
  const containerStyle = {
    padding: '2rem',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#333',
    borderBottom: '2px solid #ddd',
    paddingBottom: '0.5rem',
  };

  return (
    <div style={containerStyle}>
      <AdminNavbar />
      <h2 style={headerStyle}>Dashboard</h2>
      <DashboardCharts />
    </div>
  );
};

export default Dashboard;
