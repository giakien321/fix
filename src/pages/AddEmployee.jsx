import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';
import EmployeeForm from '../components/EmployeeForm';

function AddEmployee() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await employeeAPI.addEmployee(formData);
      alert('✅ Employee added successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Failed to add employee. Please try again.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card shadow">
          <div className="card-header bg-success text-white">
            <h2 className="mb-0">Add New Employee</h2>
          </div>
          <div className="card-body">
            <EmployeeForm 
              onSubmit={handleSubmit}
              onCancel={() => navigate('/dashboard')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;