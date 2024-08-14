import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

// Basic UI Components
const Button = ({ children, className, onClick, variant = "default", size = "md" }) => {
  const baseStyles = "py-2 px-4 rounded-lg font-semibold transition duration-300 ";
  const variantStyles = {
    default: "bg-gray-800 text-white hover:bg-gray-900",
    outline: "border border-gray-800 text-gray-800 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-gray-500 hover:bg-gray-100"
  };
  const sizeStyles = {
    sm: "text-sm py-1 px-2",
    md: "text-md py-2 px-4",
    lg: "text-lg py-3 px-6"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Table = ({ children }) => (
  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
    {children}
  </table>
);

const TableHeader = ({ children }) => (
  <thead className="bg-gray-100 text-gray-800">
    {children}
  </thead>
);

const TableRow = ({ children }) => (
  <tr className="bg-white border-b border-gray-200">
    {children}
  </tr>
);

const TableCell = ({ children, className }) => (
  <td className={`px-6 py-4 text-sm text-gray-700 ${className}`}>
    {children}
  </td>
);

const TableHead = ({ children }) => (
  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
    {children}
  </th>
);

const TableBody = ({ children }) => (
  <tbody>
    {children}
  </tbody>
);

const Avatar = ({ src, alt, children }) => (
  <div className="w-10 h-10 rounded-full overflow-hidden">
    {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : children}
  </div>
);

const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" />
);

const AvatarFallback = ({ children }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white font-bold text-lg">
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="bg-gray-800 text-white py-1 px-2 rounded-full text-xs font-medium">
    {children}
  </span>
);

export default function ViewEmployee() {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/view");
        setDataList(response.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(!localStorage.getItem("name") && !localStorage.getItem("auth")){
      navigate("/")
    }
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${id}`);
      setDataList(prevData => prevData.filter(item => item._id !== id)); // Update state to remove deleted item
      alert("Employee deleted Successfully :)");
    } catch (error) {
      console.log("Error deleting employee:", error);
    }
  };

  const filteredData = dataList.filter(employee =>
    (employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employee.mobile?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDesignation === '' || employee.designation === selectedDesignation) &&
    (selectedCourses.length === 0 || selectedCourses.some(course => employee.courses?.includes(course)))
  );

  const handleLogout = async () => {
    try {
      console.log('Attempting to sign out...');
      await signOut(auth);
      console.log('Sign-out successful.');
      localStorage.removeItem("name");
      localStorage.removeItem("auth");
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between flex-wrap">
        <Link to="#" className="flex items-center gap-2">
          <span className="text-lg font-bold">Employee Portal</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {localStorage.getItem("name") && <h1>Welcome <b>{localStorage.getItem("name")}</b></h1>}
          <button className="hover:underline" onClick={handleLogout}>Logout</button>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <Link to='/add'>
            <Button className="bg-gray-800 hover:bg-gray-900">
              Add New Employee
            </Button>
          </Link>
          <span className="md:flex-1 md:text-center">
            <h2 className="text-3xl font-semibold text-gray-700">Employee Lists</h2>
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 space-y-4 md:space-y-0 gap-4">
          <p className="text-lg font-medium text-gray-600">Total Employees: {dataList.length}</p>
          <input
            type="text"
            placeholder="Search by Name, Email"
            className="border border-gray-300 rounded-lg py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 w-full md:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 w-full md:w-auto"
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
          >
            <option value="">All Designations</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((employee, index) => (
                <TableRow key={employee._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar src={employee.image || '/placeholder-user.jpg'} alt={employee.name}>
                      {!employee.image && employee.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell>{employee.name || 'N/A'}</TableCell>
                  <TableCell>{employee.email || 'N/A'}</TableCell>
                  <TableCell>{employee.designation || 'N/A'}</TableCell>
                  <TableCell>{employee.gender || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(employee.courses) ? employee.courses.map((course, index) => (
                        <Badge key={index}>{course}</Badge>
                      )) : 'No Courses'}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(employee.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(employee.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link to={`/edit/${employee._id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
