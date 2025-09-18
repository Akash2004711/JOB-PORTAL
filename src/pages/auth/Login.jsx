import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Helmet } from 'react-helmet';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error?.message?.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.');
        } else if (error?.message?.includes('Email not confirmed')) {
          setError('Please check your email and click the confirmation link.');
        } else {
          setError(error?.message || 'An error occurred during login');
        }
        return;
      }

      // Successful login - redirect to dashboard
      navigate('/executive-talent-acquisition-overview');
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'admin@talentstrike.com', password: 'admin123', role: 'Admin' },
    { email: 'recruiter@talentstrike.com', password: 'recruiter123', role: 'Recruiter' },
    { email: 'analyst@talentstrike.com', password: 'analyst123', role: 'Analyst' }
  ];

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(demoEmail, demoPassword);
      
      if (error) {
        setError(error?.message || 'Demo login failed');
        return;
      }

      navigate('/executive-talent-acquisition-overview');
    } catch (error) {
      setError('Demo login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - TalentStrike Analytics</title>
        <meta name="description" content="Login to your TalentStrike Analytics account to access recruitment insights and analytics." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
              <div className="h-6 w-6 bg-white rounded"></div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to TalentStrike
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access your recruitment analytics dashboard
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  required
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e?.target?.value)}
                  required
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Login Failed
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
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
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>

            <div className="text-center">
              <Link
                to="/signup"
                className="text-sm text-primary hover:text-primary/80"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </form>

          {/* Demo Credentials Section */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Demo Credentials
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Use these credentials to test the application:
            </p>
            <div className="space-y-3">
              {demoAccounts?.map((account, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {account?.role}
                    </p>
                    <p className="text-xs text-gray-600">
                      {account?.email} / {account?.password}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(account?.email, account?.password)}
                    disabled={loading}
                  >
                    Login
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;