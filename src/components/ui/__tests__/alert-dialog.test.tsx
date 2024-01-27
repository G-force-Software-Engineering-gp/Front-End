import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../alert-dialog';

describe('AlertDialog Component', () => {
  it('renders AlertDialog with default props', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dialog Title</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>Dialog Description</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    // Ensure the dialog is rendered
    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
  });

  it('renders AlertDialog with custom title and description', async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Custom Title</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>Custom Description</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
    await userEvent.click(screen.getByText('Open Dialog'));
    // Ensure the custom title and description are rendered
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Description')).toBeInTheDocument();
  });

  it('calls onClick handler when Action button is clicked', async () => {
    const handleClick = jest.fn();

    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClick}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
    await userEvent.click(screen.getByText('Open Dialog'));
    // Click the Action button
    fireEvent.click(screen.getByText('OK'));

    // Ensure the onClick handler is called
    expect(handleClick).toHaveBeenCalled();
  });

  it('calls onCancel handler when Cancel button is clicked', async () => {
    const handleCancel = jest.fn();

    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
    await userEvent.click(screen.getByText('Open Dialog'));
    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure the onCancel handler is called
    expect(handleCancel).toHaveBeenCalled();
  });
});

// Add more test cases as needed to cover other scenarios and components
