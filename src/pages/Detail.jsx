import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeAPI.getEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Employee not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(salary * 1000000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading employee details...</p>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="alert alert-danger mt-5">
        <h4 className="alert-heading">❌ Error</h4>
        <p>{error || 'Employee not found'}</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-8">
        <div className="card shadow-lg">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <img 
                  src={employee.avatar} 
                  alt={employee.fullName}
                  className="img-fluid rounded-circle mb-3"
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200?text=No+Image';
                  }}
                />
                <div className="mb-2">
                  <span className={`badge ${employee.status ? 'bg-success' : 'bg-secondary'} fs-6`}>
                    {employee.status ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <div className="col-md-8">
                <h2 className="mb-4">{employee.fullName}</h2>
                
                <div className="card mb-3 border-0 bg-light">
                  <div className="card-body">
                    <h5 className="text-primary mb-3">Contact Information</h5>
                    <div className="row mb-2">
                      <div className="col-sm-4 fw-bold">Employee ID:</div>
                      <div className="col-sm-8">{employee.id}</div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-sm-4 fw-bold">Email:</div>
                      <div className="col-sm-8">{employee.email}</div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 fw-bold">Phone:</div>
                      <div className="col-sm-8">{employee.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="card mb-3 border-0 bg-light">
                  <div className="card-body">
                    <h5 className="text-primary mb-3">Job Details</h5>
                    <div className="row mb-2">
                      <div className="col-sm-4 fw-bold">Department:</div>
                      <div className="col-sm-8">
                        <span className="badge bg-info">{employee.department}</span>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-sm-4 fw-bold">Position:</div>
                      <div className="col-sm-8">{employee.position}</div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-sm-4 fw-bold">Salary:</div>
                      <div className="col-sm-8 text-success fw-bold">
                        {formatSalary(employee.salary)}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 fw-bold">Join Date:</div>
                      <div className="col-sm-8">{formatDate(employee.joinDate)}</div>
                    </div>
                  </div>
                </div>

                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate('/')}
                >
                  ← Back to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;