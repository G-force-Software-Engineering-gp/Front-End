import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AuthContext, { AuthContextType } from '@/contexts/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Lock, Mail } from 'lucide-react';
import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
});

type LoginFormValues = z.input<typeof loginSchema>;

const Login: React.FC = () => {
  const authContext = useContext<AuthContextType | null>(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is not provided properly.');
  }
  const { loginUser } = authContext;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await loginUser(data);

    } catch (error) {
      console.error('Error:', error);
    }
  };
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center gap-5">
      {theme === 'dark' ? (
        <img className="hidden h-[450px] w-1/2 border-4 md:block  " src={require('../../pics/loginDark.png')} alt="" />
      ) : (
        <img className="hidden h-[450px] w-1/2 border-4 md:block  " src={require('../../pics/loginLight.png')} alt="" />
      )}
      <div className="flex h-screen flex-col items-center justify-center">
        <Label className="mb-12 text-center text-2xl font-semibold">Logo</Label>
        <Label className="mb-9 text-2xl font-semibold">Login</Label>
        <Card className="w-96 bg-secondary px-12 py-14">
          <form onSubmit={handleSubmit(onSubmit)} className="grid">
            <Label className="relative mb-4 flex">
              <Input
                placeholder="Email"
                type="email"
                {...register('email')}
                className="peer bg-transparent pl-9 ring-2"
              />
              <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
                <Mail className="h-4 w-4" />
              </Label>
            </Label>
            {errors.email && <Label className="mb-4 text-xs text-red-500">{errors.email.message}</Label>}
            <Label className="relative mb-4 flex">
              <Input
                placeholder="Password"
                type="password"
                {...register('password')}
                className="peer bg-transparent pl-9 ring-2"
              />
              <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
                <Lock className="h-4 w-4" />
              </Label>
            </Label>
            {errors.password && <Label className="mb-4 text-xs text-red-500">{errors.password.message}</Label>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Loging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-4 flex justify-center gap-2 text-sm">
            <Label>Dont have Account? </Label>
            <Link className="hover:text-primary" to={'/register'}>
              Create account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
