import { Link } from 'react-router-dom';

function EmployeeCard({ employee }) {
  const formatSalary = (salary) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(salary * 1000000);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img 
          src={employee.avatar} 
          className="card-img-top" 
          alt={employee.fullName}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200?text=No+Image';
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{employee.fullName}</h5>
          <p className="card-text">
            <strong>Department:</strong> {employee.department}<br />
            <strong>Position:</strong> {employee.position}<br />
            <strong>Salary:</strong> <span className="text-success">{formatSalary(employee.salary)}</span>
          </p>
          <div className="mt-2 mb-3">
            <span className={`badge ${employee.status ? 'bg-success' : 'bg-secondary'}`}>
              {employee.status ? 'Active' : 'Inactive'}
            </span>
          </div>
          <Link 
            to={`/employee/${employee.id}`} 
            className="btn btn-primary w-100 mt-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;