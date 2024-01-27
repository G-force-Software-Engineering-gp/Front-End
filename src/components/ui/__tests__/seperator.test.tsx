/* eslint-disable testing-library/no-node-access */
// Import necessary dependencies and the component
import { render } from '@testing-library/react';
import React from 'react';
import { Separator } from '../separator';

// Describe the test suite
describe('Separator Component', () => {
  // Test case: Renders Separator with default props
  it('renders Separator with default props', () => {
    const { container } = render(<Separator />);

    // Ensure the component is rendered
    expect(container.firstChild).toBeInTheDocument();

    // You can add more specific assertions based on your component's structure and behavior
    // For example, check if the default orientation is horizontal
    expect(container.firstChild).toHaveClass('h-[1px] w-full');
  });

  // Test case: Renders Separator with vertical orientation
  it('renders Separator with vertical orientation', () => {
    const { container } = render(<Separator orientation="vertical" />);

    // Ensure the component is rendered
    expect(container.firstChild).toBeInTheDocument();

    // Check if the orientation class is applied correctly for vertical orientation
    expect(container.firstChild).toHaveClass('h-full w-[1px]');
  });

  // You can add more test cases to cover different scenarios and props

  // Test case: Renders Separator with custom class
  it('renders Separator with custom class', () => {
    const { container } = render(<Separator className="custom-class" />);

    // Ensure the component is rendered
    expect(container.firstChild).toBeInTheDocument();

    // Check if the custom class is applied
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
