import { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';
import EmployeeCard from '../components/EmployeeCard';

function Home() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await employeeAPI.getAllEmployees();
            // Sort by salary descending (yêu cầu đề: display all employees sorted by salary descending)
            const sortedData = data.sort((a, b) => b.salary - a.salary);
            setEmployees(sortedData);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to load employees. Please check your API configuration.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading employees...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-warning mt-5" role="alert">
                <h4 className="alert-heading">⚠️ API Configuration Needed</h4>
                <p>{error}</p>
                <hr />
                <p className="mb-0">
                    <strong>To fix this:</strong>
                    <ol className="mt-2">
                        <li>Go to <a href="https://mockapi.io" target="_blank" rel="noopener noreferrer">mockapi.io</a></li>
                        <li>Create a resource named <code>employeeManagement</code></li>
                        <li>Copy your API URL to <code>.env</code> file</li>
                        <li>Restart the dev server</li>
                    </ol>
                    <button className="btn btn-primary mt-2" onClick={fetchEmployees}>
                        Retry
                    </button>
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Employee Directory</h1>
                <span className="badge bg-primary fs-6">{employees.length} employees</span>
            </div>

            {employees.length === 0 ? (
                <div className="alert alert-info">
                    No employees found. Add some employees to get started!
                </div>
            ) : (
                <div className="row">
                    {employees.map(employee => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;