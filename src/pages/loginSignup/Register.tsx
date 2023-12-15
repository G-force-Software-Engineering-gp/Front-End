import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AuthContext, { AuthContextType } from '@/contexts/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Eye, EyeOff, Lock, Mail, UserCircle, UserSquare } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import signupDark from '../../pics/signupDark.png';
import signupLight from '../../pics/signupLight.png';

const registrationSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  username: z.string().min(1, 'Username is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
});

type RegistrationFormValues = z.input<typeof registrationSchema>;

const Register: React.FC = () => {
  const authContext = useContext<AuthContextType | null>(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  if (!authContext) {
    throw new Error('AuthContext is not provided properly.');
  }
  const { registerUser } = authContext;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-center gap-5">
      {theme === 'dark' ? (
        <img className="hidden h-[620px] w-1/2 border-4 md:block  " src={signupDark} alt="" />
      ) : (
        <img className="hidden h-[620px] w-1/2 border-4 md:block  " src={signupLight} alt="" />
      )}
      <div className="flex h-screen flex-col items-center justify-center">
        <Label className="mb-12 text-center text-2xl font-semibold">Logo</Label>
        <Label className="mb-9 text-2xl font-semibold">Register</Label>
        <Card className="w-96 bg-secondary px-12 py-14">
          <form onSubmit={handleSubmit(onSubmit)} className="grid">
            <Label className="relative mb-4 flex">
              <Input
                type="text"
                {...register('firstName')}
                placeholder="First Name"
                className="peer bg-transparent pl-9 ring-2"
              />
              <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
                <UserCircle className="h-4 w-4" />
              </Label>
            </Label>
            {errors.firstName && <Label className="mb-4 text-xs text-red-500">{errors.firstName.message}</Label>}
            <Label className="relative mb-4 flex">
              <Input
                type="text"
                {...register('lastName')}
                placeholder="Last Name"
                className="peer bg-transparent pl-9 ring-2"
              />
              <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
                <UserCircle className="h-4 w-4" />
              </Label>
            </Label>
            {errors.lastName && <Label className="mb-4 text-xs text-red-500">{errors.lastName.message}</Label>}
            <Label className="relative mb-4 flex">
              <Input
                type="email"
                {...register('email')}
                placeholder="Email"
                className="peer bg-transparent pl-9 ring-2"
              />
              <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
                <Mail className="h-4 w-4" />
              </Label>
            </Label>
            {errors.email && <Label className="mb-4 text-xs text-red-500">{errors.email.message}</Label>}
            <Label className="relative mb-4 flex">
              <Input
                type="text"
                {...register('username')}
                placeholder="Username"
                className="peer bg-transparent pl-9 ring-2"
              />
              <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
                <UserSquare className="h-4 w-4" />
              </Label>
            </Label>
            {errors.username && <Label className="mb-4 text-xs text-red-500">{errors.username.message}</Label>}
            <Label className="relative mb-4 flex">
              <Input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Password"
                className="peer bg-transparent pl-9 ring-2"
              />
              <Label
                className="absolute right-0 flex h-full w-10 cursor-pointer items-center justify-center text-primary/60 peer-focus:text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Label>
              <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
                <Lock className="h-4 w-4" />
              </Label>
            </Label>
            {errors.password && <Label className="mb-4 text-xs text-red-500">{errors.password.message}</Label>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </form>
          <div className="mt-4 flex justify-center gap-2 text-sm">
            <Label>Already have an account? </Label>
            <Link className="hover:text-primary" to={'/login'}>
              Log In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
