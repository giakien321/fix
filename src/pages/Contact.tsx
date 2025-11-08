import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Contact Us</h2>
              <p className="lead">
                For any inquiries about the Student Management System, please reach out to us.
              </p>
              <hr />
              <div className="row mt-4">
                <div className="col-md-6 mb-3">
                  <h5><i className="bi bi-envelope"></i> Email</h5>
                  <p>admin@studentmanagement.edu</p>
                </div>
                <div className="col-md-6 mb-3">
                  <h5><i className="bi bi-telephone"></i> Phone</h5>
                  <p>+84 123 456 789</p>
                </div>
                <div className="col-md-6 mb-3">
                  <h5><i className="bi bi-geo-alt"></i> Address</h5>
                  <p>FPT University<br/>Ho Chi Minh City, Vietnam</p>
                </div>
                <div className="col-md-6 mb-3">
                  <h5><i className="bi bi-clock"></i> Office Hours</h5>
                  <p>Monday - Friday<br/>8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;