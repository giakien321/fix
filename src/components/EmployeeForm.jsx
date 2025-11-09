import { useState, useEffect } from 'react';

function EmployeeForm({ employee, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    avatar: '',
    joinDate: '',
    status: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const validate = () => {
    const newErrors = {};

    // Full name validation: required and minimum 3 words
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().split(' ').length < 3) {
      newErrors.fullName = 'Full name must have at least 3 words';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email must be valid';
    }

    // Phone validation: 10 digits
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }

    // Department validation
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    // Position validation
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    // Salary validation: positive number
    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    // Avatar validation: must be URL
    if (!formData.avatar.trim()) {
      newErrors.avatar = 'Avatar URL is required';
    } else if (!isValidURL(formData.avatar)) {
      newErrors.avatar = 'Avatar must be a valid URL';
    }

    // Join date validation: not future date
    if (!formData.joinDate) {
      newErrors.joinDate = 'Join date is required';
    } else if (new Date(formData.joinDate) > new Date()) {
      newErrors.joinDate = 'Join date cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name (min 3 words)"
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@company.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Phone *</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0901234567"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Join Date *</label>
          <input
            type="date"
            className={`form-control ${errors.joinDate ? 'is-invalid' : ''}`}
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
          />
          {errors.joinDate && <div className="invalid-feedback">{errors.joinDate}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Department *</label>
          <input
            type="text"
            className={`form-control ${errors.department ? 'is-invalid' : ''}`}
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="IT, HR, Marketing..."
          />
          {errors.department && <div className="invalid-feedback">{errors.department}</div>}
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Position *</label>
          <input
            type="text"
            className={`form-control ${errors.position ? 'is-invalid' : ''}`}
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Senior Developer..."
          />
          {errors.position && <div className="invalid-feedback">{errors.position}</div>}
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Salary (Million VND) *</label>
          <input
            type="number"
            className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="2500"
            step="0.1"
          />
          {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Avatar URL *</label>
        <input
          type="text"
          className={`form-control ${errors.avatar ? 'is-invalid' : ''}`}
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="https://example.com/avatar.jpg"
        />
        {errors.avatar && <div className="invalid-feedback">{errors.avatar}</div>}
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="status"
          checked={formData.status}
          onChange={handleChange}
          id="statusCheck"
        />
        <label className="form-check-label" htmlFor="statusCheck">
          Active Employee
        </label>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {employee ? 'Update' : 'Add'} Employee
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;