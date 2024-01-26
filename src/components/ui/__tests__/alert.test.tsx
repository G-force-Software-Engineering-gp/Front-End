import { render, screen } from '@testing-library/react';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../alert';

describe('Alert Components', () => {
  it('renders Alert with default variant', () => {
    render(<Alert>Default Alert</Alert>);

    const alertElement = screen.getByRole('alert');

    // Ensure the default variant styles are applied
    expect(alertElement).toHaveClass('bg-background text-foreground');
    // You can add more specific assertions based on your component's structure and behavior
    // For example, check for the presence of the role attribute
    expect(alertElement).toHaveAttribute('role', 'alert');
  });

  it('renders Alert with destructive variant', () => {
    render(<Alert variant="destructive">Destructive Alert</Alert>);

    const alertElement = screen.getByRole('alert');

    // Ensure the destructive variant styles are applied
    expect(alertElement).toHaveClass('border-destructive/50 text-destructive dark:border-destructive');
  });

  it('renders AlertTitle with custom styles', () => {
    render(<AlertTitle className="custom-title">Custom Title</AlertTitle>);

    const titleElement = screen.getByText('Custom Title');

    // Ensure the custom class is applied
    expect(titleElement).toHaveClass('mb-1 font-medium leading-none tracking-tight custom-title');
  });

  it('renders AlertDescription with custom styles', () => {
    render(<AlertDescription className="custom-description">Custom Description</AlertDescription>);

    const descriptionElement = screen.getByText('Custom Description');

    // Ensure the custom class is applied
    expect(descriptionElement).toHaveClass('custom-description');
  });
});

// Add more test cases as needed to cover other scenarios and components
