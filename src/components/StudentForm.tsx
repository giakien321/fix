import React, { useState, useEffect } from 'react';
import type { Student } from '../types/student';

interface StudentFormProps {
  student: Student | null;
  onClose: () => void;
  onSave: (data: Student | Omit<Student, 'id'>) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateofbirth: '',
    gender: true,
    class: '',
    image: '',
    feedback: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        dateofbirth: student.dateofbirth,
        gender: student.gender,
        class: student.class,
        image: student.image,
        feedback: student.feedback || ''
      });
    }
  }, [student]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else {
      const words = formData.name.trim().split(/\s+/).filter(w => w.length > 0);
      if (words.length < 2) {
        newErrors.name = 'Name must have more than 2 words';
      }
    }

    if (!formData.dateofbirth) {
      newErrors.dateofbirth = 'Date of Birth is required';
    }

    if (!formData.class.trim()) {
      newErrors.class = 'Class is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!/^https?:\/\/.+\..+/.test(formData.image)) {
      newErrors.image = 'Image must be a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const dataToSave = student
        ? { ...formData, id: student.id }
        : formData;
      onSave(dataToSave);
    }
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{student ? 'Edit Student' : 'Add Student'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name (e.g., Nguyen Van A)"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth *</label>
                <input
                  type="text"
                  className={`form-control ${errors.dateofbirth ? 'is-invalid' : ''}`}
                  value={formData.dateofbirth}
                  onChange={e => setFormData({ ...formData, dateofbirth: e.target.value })}
                />
                {errors.dateofbirth && <div className="invalid-feedback">{errors.dateofbirth}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Gender *</label>
                <select
                  className="form-select"
                  value={formData.gender.toString()}
                  onChange={e => setFormData({ ...formData, gender: e.target.value === 'true' })}
                >
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Class *</label>
                <input
                  type="text"
                  className={`form-control ${errors.class ? 'is-invalid' : ''}`}
                  value={formData.class}
                  onChange={e => setFormData({ ...formData, class: e.target.value })}
                  placeholder="Enter class (e.g., SE1801)"
                />
                {errors.class && <div className="invalid-feedback">{errors.class}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL *</label>
                <input
                  type="text"
                  className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && <div className="invalid-feedback">{errors.image}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Feedback (Optional)</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={formData.feedback}
                  onChange={e => setFormData({ ...formData, feedback: e.target.value })}
                  placeholder="Enter feedback..."
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {student ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
