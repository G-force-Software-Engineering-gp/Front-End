import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { UserCircle , Mail , Lock , UserSquare } from 'lucide-react';


const registrationSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
  username: z.string().min(1, 'Username is required'),
});

type RegistrationFormValues = z.input<typeof registrationSchema>;

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors , isSubmitting } } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    try {
      // Replace this with your registration logic
      console.log('Form data:', data);

      // Simulate an async operation (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Registration complete!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <Label className="text-2xl font-semibold mb-12 text-center">Logo</Label>
      <Label className="text-2xl font-semibold mb-9">Register</Label>
      <Card className="w-96 py-14 px-12 bg-secondary">

        <form onSubmit={handleSubmit(onSubmit)} className='grid'>
          <Label className="relative mb-4 flex">
            <Input
              type="text"
              {...register('firstName')}
              placeholder="First Name"
              className="ring-2 pl-9 peer bg-transparent"
              required
            />
            <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
              <UserCircle className='h-4 w-4'/>
            </Label>
          </Label>
            {errors.firstName && <Label className="text-red-500 mb-4 text-xs">{errors.firstName.message}</Label>}
          <Label className="relative mb-4 flex">
            <Input
              type="text"
              {...register('lastName')}
              placeholder="Last Name"
              className="ring-2 pl-9 peer bg-transparent"
              required
            />
            <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
              <UserCircle className='h-4 w-4'/>
            </Label>
          </Label>
            {errors.lastName && <Label className="text-red-500 mb-4 text-xs">{errors.lastName.message}</Label>}
          <Label className="relative mb-4 flex">
            <Input
              type="email"
              {...register('email')}
              placeholder="Email"
              className="ring-2 pl-9 peer bg-transparent"
              required
            />
            <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
              <Mail className='h-4 w-4'/>
            </Label>
          </Label>
            {errors.email && <Label className="text-red-500 mb-4 text-xs">{errors.email.message}</Label>}
          <Label className="relative mb-4 flex">
            <Input
              type="text"
              {...register('username')}
              placeholder="Username"
              className="ring-2 pl-9 peer bg-transparent"
              required
            />
            <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
              <UserSquare className='h-4 w-4'/>
            </Label>
          </Label>
            {errors.username && <Label className="text-red-500 mb-4 text-xs">{errors.username.message}</Label>}
          <Label className="relative mb-4 flex">
            <Input
              type="password"
              {...register('password')}
              placeholder="Password"
              className="ring-2 pl-9 peer bg-transparent"
              required
            />
            <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
              <Lock className='h-4 w-4'/>
            </Label>
          </Label>
          {errors.password && <Label className="text-red-500 mb-4 text-xs">{errors.password.message}</Label>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <div className="mt-4 text-sm flex justify-center gap-2">
          <Label>Already have an account? </Label>
          <Link
            className="hover:text-primary"
            to={"/login"}
          >
            Log In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
