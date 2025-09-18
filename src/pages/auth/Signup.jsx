import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Helmet } from 'react-helmet';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'recruiter',
    department: 'hr'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'hr_manager', label: 'HR Manager' },
    { value: 'recruiter', label: 'Recruiter' },
    { value: 'analyst', label: 'Analyst' }
  ];

  const departmentOptions = [
    { value: 'hr', label: 'Human Resources' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'design', label: 'Design' },
    { value: 'product', label: 'Product' }
  ];

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    // Validation
    if (!formData?.email || !formData?.password || !formData?.fullName) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData?.password !== formData?.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData?.password?.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await signUp(formData?.email, formData?.password, {
        full_name: formData?.fullName,
        role: formData?.role,
        department: formData?.department
      });
      
      if (error) {
        if (error?.message?.includes('already registered')) {
          setError('An account with this email already exists. Please login instead.');
        } else {
          setError(error?.message || 'An error occurred during signup');
        }
        return;
      }

      setSuccess('Account created successfully! Please check your email to confirm your account.');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - TalentStrike Analytics</title>
        <meta name="description" content="Create your TalentStrike Analytics account to access recruitment insights and analytics." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
              <div className="h-6 w-6 bg-white rounded"></div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Join TalentStrike Analytics platform
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData?.fullName}
                  onChange={(e) => handleChange('fullName', e?.target?.value)}
                  required
                  placeholder="Enter your full name"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleChange('email', e?.target?.value)}
                  required
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData?.password}
                  onChange={(e) => handleChange('password', e?.target?.value)}
                  required
                  placeholder="Enter your password (min 6 characters)"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password *
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData?.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e?.target?.value)}
                  required
                  placeholder="Confirm your password"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <Select
                  id="role"
                  name="role"
                  value={formData?.role}
                  onChange={(value) => handleChange('role', value)}
                  options={roleOptions}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <Select
                  id="department"
                  name="department"
                  value={formData?.department}
                  onChange={(value) => handleChange('department', value)}
                  options={departmentOptions}
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Signup Failed
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Success!
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>{success}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-primary hover:text-primary/80"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;