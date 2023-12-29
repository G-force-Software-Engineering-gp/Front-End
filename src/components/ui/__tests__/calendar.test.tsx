import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Calendar } from '../calendar';

describe('Calendar Component', () => {
  it('renders Calendar with default props', () => {
    render(<Calendar />);

    const calendarTable = screen.getByRole('grid');
    const calendarRow = screen.getByRole('row', { name: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday' });

    // Ensure the calendar table and its parts are rendered
    expect(calendarTable).toBeInTheDocument();
    expect(calendarRow).toBeInTheDocument();

    // You can add more specific assertions based on your component's structure and behavior
    // For example, check for the presence of specific columns or days
    expect(screen.getByRole('columnheader', { name: 'Sunday' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Monday' })).toBeInTheDocument();
    // ... Add assertions for other days or components
  });

  // Add more test cases as needed to cover other interactions and scenarios
});
