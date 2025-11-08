import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Student } from '../types/student';
import { api } from '../service/api';

const Home: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await api.getAll();
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      setStudents(sorted);
      setError('');
    } catch (err) {
      setError('Failed to load students');
      console.error(err);
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-4">All Students</h2>
      <div className="row">
        {students.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No students found</div>
          </div>
        ) : (
          students.map(student => (
            <div key={student.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img 
                  src={student.image} 
                  className="card-img-top" 
                  alt={student.name}
                  style={{height: '200px', objectFit: 'cover'}}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{student.name}</h5>
                  <p className="card-text">
                    <strong>ID:</strong> {student.id}<br/>
                    <strong>DOB:</strong> {student.dateofbirth}<br/>
                    <strong>Gender:</strong> {student.gender ? 'Male' : 'Female'}<br/>
                    <strong>Class:</strong> {student.class}
                  </p>
                  <Link to={`/student/${student.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;