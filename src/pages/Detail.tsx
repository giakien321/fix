import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Student } from '../types/student';
import { api } from '../service/api';

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (id) {
            loadStudent(id);
        }
    }, [id]);

    const loadStudent = async (studentId: string) => {
        try {
            setLoading(true);
            const data = await api.getById(studentId);
            setStudent(data);
            setError('');
        } catch (err) {
            setError('Failed to load student details');
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

    if (error || !student) {
        return (
            <div className="container">
                <div className="alert alert-danger">{error || 'Student not found'}</div>
                <Link to="/" className="btn btn-secondary">Back to Home</Link>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="card shadow">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={student.image}
                            className="img-fluid rounded-start"
                            alt={student.name}
                            style={{ height: '100%', objectFit: 'cover', minHeight: '400px' }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=No+Image';
                            }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title mb-4">{student.name}</h2>
                            <div className="mb-3">
                                <div className="row mb-2">
                                    <div className="col-4"><strong>Student ID:</strong></div>
                                    <div className="col-8">{student.id}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-4"><strong>Date of Birth:</strong></div>
                                    <div className="col-8">{student.dateofbirth}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-4"><strong>Gender:</strong></div>
                                    <div className="col-8">
                                        <span className={`badge ${student.gender ? 'bg-primary' : 'bg-danger'}`}>
                                            {student.gender ? 'Male' : 'Female'}
                                        </span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-4"><strong>Class:</strong></div>
                                    <div className="col-8">{student.class}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-4"><strong>Feedback:</strong></div>
                                    <div className="col-8">{student.feedback || 'No feedback available'}</div>
                                </div>
                            </div>
                            <Link to="/" className="btn btn-secondary">
                                <i className="bi bi-arrow-left"></i> Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;