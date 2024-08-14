import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Basic UI components for form elements
const Card = ({ children, className }) => <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>;
const CardHeader = ({ children }) => <div className="border-b border-gray-300 p-4">{children}</div>;
const CardTitle = ({ children, className }) => <h2 className={`text-2xl font-semibold text-gray-900 ${className}`}>{children}</h2>;
const CardDescription = ({ children }) => <p className="text-gray-700">{children}</p>;
const CardContent = ({ children }) => <div className="p-4">{children}</div>;
const CardFooter = ({ children, className }) => <div className={`border-t border-gray-300 p-4 ${className}`}>{children}</div>;

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-gray-800 font-medium mb-2">
    {children}
  </label>
);

const Input = ({ id, type = 'text', placeholder, ...props }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
    {...props}
  />
);

const Select = ({ id, name, value, onChange, children }) => (
  <select id={id} name={name} value={value} onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
    {children}
  </select>
);

const RadioGroup = ({ children }) => <div className="flex items-center gap-4">{children}</div>;

const RadioGroupItem = ({ id, name, value, checked, onChange, label }) => (
  <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="peer sr-only"
    />
    <div className="w-5 h-5 rounded-full border border-gray-300 transition-colors peer-checked:bg-gray-800 peer-checked:border-gray-800" />
    <span className="text-sm text-gray-800">{label}</span>
  </label>
);

const Button = ({ type = 'button', children, className, ...props }) => (
  <button type={type} className={`bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 ${className}`} {...props}>
    {children}
  </button>
);

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: '',
    image: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:4000/view/${id}`)
      .then((res) => {
        setInputs(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [id]);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === 'radio') {
      setInputs((prev) => ({ ...prev, [name]: value }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleEdit(event) {
    event.preventDefault();
    setLoading(true);

    const uploadImageToCloudinary = () => {
      return new Promise((resolve, reject) => {
        if (!file) {
          resolve(null);
        } else {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'ems_portal');
          formData.append('cloud_name', 'dmopj2k6n');

          axios
            .post('https://api.cloudinary.com/v1_1/dmopj2k6n/image/upload', formData)
            .then((response) => {
              resolve(response.data.url);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    };

    uploadImageToCloudinary()
      .then((imageUrl) => {
        const updatedData = {
          ...inputs,
          image: imageUrl || inputs.image,
        };

        return axios.put(`http://localhost:4000/edit/${id}`, updatedData);
      })
      .then(() => {
        alert("Employee data edited successfully");
        navigate('/view');
      })
      .catch((error) => {
        console.error("Error updating employee data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 sm:p-8 md:p-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Edit Employee</CardTitle>
        <CardDescription>Update the form to edit the employee details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEdit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={inputs.name} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={inputs.email} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile No.</Label>
              <Input id="mobile" name="mobile" type="tel" value={inputs.mobile} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="designation">Designation</Label>
              <Select id="designation" name="designation" value={inputs.designation} onChange={handleInputChange}>
                <option value="">Select designation</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              {/* <Label>Gender</Label> */}
              {/* <RadioGroup>
                <RadioGroupItem
                  id="male"
                  name="gender"
                  value="male"
                  checked={inputs.gender === 'male'}
                  onChange={handleInputChange}
                  label="Male"
                />
                <RadioGroupItem
                  id="female"
                  name="gender"
                  value="female"
                  checked={inputs.gender === 'female'}
                  onChange={handleInputChange}
                  label="Female"
                />
              </RadioGroup> */}
            </div>
            <div className="grid gap-2">
              <Label>Courses</Label>
              <RadioGroup>
                <RadioGroupItem
                  id="mca"
                  name="courses"
                  value="MCA"
                  checked={inputs.courses === 'MCA'}
                  onChange={handleInputChange}
                  label="MCA"
                />
                <RadioGroupItem
                  id="bca"
                  name="courses"
                  value="BCA"
                  checked={inputs.courses === 'BCA'}
                  onChange={handleInputChange}
                  label="BCA"
                />
                <RadioGroupItem
                  id="bsc"
                  name="courses"
                  value="BSC"
                  checked={inputs.courses === 'BSC'}
                  onChange={handleInputChange}
                  label="BSC"
                />
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image Upload</Label>
              <Input id="image" name="image" type="file" onChange={handleFileChange} />
            </div>
          </div>
          <CardFooter className="col-span-2">
            <Button type="submit" disabled={loading} className="mt-7 ml-[-9px]">
              {loading ? 'Saving...' : 'Make Changes'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
