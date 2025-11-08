import React, { useState, useEffect } from 'react';
import type { Student } from '../types/student';
import { api } from '../service/api';
import StudentForm from '../components/StudentForm';
import ConfirmModal from '../components/ConfirmModal';

const Management: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editStudent, setEditStudent] = useState<Student | null>(null);
    const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const data = await api.getAll();
            console.log('Students from API:', data);
            setStudents(data);
        } catch (err) {
            console.error('Failed to load students:', err);
            alert('Failed to load students');
        } finally {
            setLoading(false);
        }
    };
    const handleAdd = () => {
        setEditStudent(null);
        setShowForm(true);
    };
    const handleEdit = (student: Student) => {
        setEditStudent(student);
        setShowForm(true);
    };
    const handleSave = async (studentData: Student | Omit<Student, 'id'>) => {
        try {
            if (editStudent) {
                await api.update(editStudent.id, studentData);
                alert('Student updated successfully!');
            } else {
                const created = await api.create(studentData);
                alert(`Student "${created.name}" added successfully!`);
            }
            setShowForm(false);
            setEditStudent(null);
            loadStudents();
        } catch (err) {
            console.error('Failed to save student:', err);
            alert('Failed to save student');
        }
    };

    const handleDelete = async () => {
        if (!deleteStudent) return;
        console.log('Deleting student with ID:', deleteStudent.id);
        try {
            await api.delete(String(deleteStudent.id)); 
            alert('Student deleted successfully!');
            setDeleteStudent(null);
            loadStudents();
        } catch (err) {
            console.error('Failed to delete student:', err);
            alert('Failed to delete student');
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

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Student Management Dashboard</h2>
                <button className="btn btn-success" onClick={handleAdd}>
                    <i className="bi bi-plus-circle"></i> Add New Student
                </button>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Date of Birth</th>
                                    <th>Gender</th>
                                    <th>Class</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center">No students found</td>
                                    </tr>
                                ) : (
                                    students.map(student => (
                                        <tr key={student.id}>
                                            <td>{student.id}</td>
                                            <td>{student.name}</td>
                                            <td>{student.dateofbirth}</td>
                                            <td>
                                                <span className={`badge ${student.gender ? 'bg-primary' : 'bg-danger'}`}>
                                                    {student.gender ? 'Male' : 'Female'}
                                                </span>
                                            </td>
                                            <td>{student.class}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => handleEdit(student)}
                                                >
                                                    <i className="bi bi-pencil"></i> Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => setDeleteStudent(student)}
                                                >
                                                    <i className="bi bi-trash"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showForm && (
                <StudentForm
                    student={editStudent}
                    onClose={() => {
                        setShowForm(false);
                        setEditStudent(null);
                    }}
                    onSave={handleSave}
                />
            )}

            {deleteStudent && (
                <ConfirmModal
                    title="Confirm Delete"
                    message={`Are you sure you want to delete student "${deleteStudent.name}"? This action cannot be undone.`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteStudent(null)}
                />
            )}
        </div>
    );
};

export default Management;
