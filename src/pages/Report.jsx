function Reports() {
  return (
    <div>
      <h1 className="mb-4">Reports & Contact</h1>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Contact Information</h4>
            </div>
            <div className="card-body">
              <p className="mb-2">
                <strong>Email:</strong> hr@company.com
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> +84 123 456 789
              </p>
              <p className="mb-2">
                <strong>Address:</strong> 123 Business Street, District 1, Ho Chi Minh City
              </p>
              <p className="mb-0">
                <strong>Website:</strong> <a href="https://company.com">www.company.com</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Working Hours</h4>
            </div>
            <div className="card-body">
              <p className="mb-2">
                <strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM
              </p>
              <p className="mb-2">
                <strong>Saturday:</strong> 8:00 AM - 12:00 PM
              </p>
              <p className="mb-2">
                <strong>Sunday:</strong> Closed
              </p>
              <p className="mb-0">
                <strong>Lunch Break:</strong> 12:00 PM - 1:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h4 className="mb-0">About Our Company</h4>
        </div>
        <div className="card-body">
          <p>
            Welcome to our Employee Management System. We are committed to providing 
            the best work environment for our employees and maintaining efficient 
            human resource management.
          </p>
          <p className="mb-0">
            Our system helps track employee information, manage departments, and 
            streamline HR processes. For any inquiries or support, please contact 
            our HR department using the information provided above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reports;