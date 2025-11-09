import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeAPI } from '../services/api';
import EmployeeForm from '../components/EmployeeForm';

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await employeeAPI.getAllEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to load employees');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await employeeAPI.deleteEmployee(id);
                alert('✅ Employee deleted successfully!');
                fetchEmployees();
            } catch (error) {
                console.error('Error:', error);
                alert('❌ Failed to delete employee. Please try again.');
            }
        }
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setShowModal(true);
    };

    const handleUpdate = async (formData) => {
        try {
            await employeeAPI.updateEmployee(editingEmployee.id, formData);
            alert('✅ Employee updated successfully!');
            setShowModal(false);
            setEditingEmployee(null);
            fetchEmployees();
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Failed to update employee. Please try again.');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingEmployee(null);
    };

    const formatSalary = (salary) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(salary * 1000000);
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading dashboard data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mt-5">
                <h4 className="alert-heading">❌ Error</h4>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={fetchEmployees}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Employee Management Dashboard</h1>
                <Link to="/addEmployee" className="btn btn-success">
                    ➕ Add New Employee
                </Link>
            </div>

            {employees.length === 0 ? (
                <div className="alert alert-info">
                    No employees found. Add some employees to get started!
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Avatar</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Position</th>
                                <th>Salary</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>
                                        <img
                                            src={employee.avatar}
                                            alt={employee.fullName}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover',
                                                borderRadius: '50%'
                                            }}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/50?text=No+Image';
                                            }}
                                        />
                                    </td>
                                    <td>{employee.fullName}</td>
                                    <td>{employee.email}</td>
                                    <td>
                                        <span className="badge bg-info">{employee.department}</span>
                                    </td>
                                    <td>{employee.position}</td>
                                    <td className="text-success fw-bold">
                                        {formatSalary(employee.salary)}
                                    </td>
                                    <td>
                                        <span className={`badge ${employee.status ? 'bg-success' : 'bg-secondary'}`}>
                                            {employee.status ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <Link
                                                to={`/employee/${employee.id}`}
                                                className="btn btn-sm btn-info"
                                                title="View"
                                            >
                                                👁️
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => handleEdit(employee)}
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(employee.id)}
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Modal */}
            {showModal && (
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Employee</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <EmployeeForm
                                    employee={editingEmployee}
                                    onSubmit={handleUpdate}
                                    onCancel={handleCloseModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;