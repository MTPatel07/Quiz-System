import { useState, useEffect } from 'react';
import { signIn, signUp, supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface AuthFormProps {
  onSuccess: () => void;
}

export const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'student'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if Supabase is configured
    if (!supabase) {
      setSupabaseConfigured(false);
      setError('Supabase is not configured. Please set up your environment variables.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    if (!supabase) {
      setError('Supabase is not configured. Please set up your environment variables.');
      return;
    }
    
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password, role);
        if (error) throw error;
      }
      onSuccess();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center">
      <div className="w-full max-w-lg px-6">
        <div className="modern-card p-12 fade-in">
          {!supabaseConfigured && (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-yellow-800">Setup Required</h3>
              </div>
              <p className="text-sm text-yellow-700">
                Please configure your Supabase environment variables in the .env.local file and restart the development server.
              </p>
            </div>
          )}
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-2">
              {isLogin ? 'Welcome Back' : 'Join QuizMaster'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to continue your learning journey' : 'Create an account to start quizzing'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
              required
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              required
            />
            
            {!isLogin && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      role === 'student'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        </svg>
                      </div>
                      <p className="font-medium">Student</p>
                      <p className="text-xs text-gray-500">Take quizzes</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      role === 'admin'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="font-medium">Admin</p>
                      <p className="text-xs text-gray-500">Create quizzes</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={loading} 
              loading={loading}
              size="lg"
              className="w-full"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <span className="underline">{isLogin ? 'Sign up' : 'Sign in'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};