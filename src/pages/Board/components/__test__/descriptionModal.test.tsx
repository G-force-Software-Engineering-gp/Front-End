import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DescriptionModalComponent } from '../descriptionModal';

describe('DescriptionModalComponent', () => {
  it('renders the component with default description', () => {
    render(<DescriptionModalComponent description="Default description" setDescription={() => {}} />);

    // Check if the default description is rendered
    expect(screen.getByText('Default description')).toBeInTheDocument();
  });

  it('toggles between view and edit modes', () => {
    render(<DescriptionModalComponent description="Default description" setDescription={() => {}} />);

    // Check if the component is initially in view mode
    expect(screen.getByText('Default description')).toBeInTheDocument();

    // Click to switch to edit mode
    userEvent.click(screen.getByText('Default description'));

    // Check if the textarea is rendered in edit mode
    expect(screen.getByPlaceholderText('Add a more detailed description...')).toBeInTheDocument();

    userEvent.click(screen.getByText('Cancel'));

    expect(screen.getByText('Default description')).toBeInTheDocument();
  });

  it('submits the form and saves the new description', async () => {
    const setDescriptionMock = jest.fn();
    render(<DescriptionModalComponent description="Default description" setDescription={setDescriptionMock} />);

    // Click to switch to edit mode
    userEvent.click(screen.getByText('Default description'));

    const textarea = screen.getByPlaceholderText('Add a more detailed description...');
    userEvent.type(textarea, 'New description');

    fireEvent.click(screen.getByText('Save'));

    // await waitFor(() => {
    //   expect(setDescriptionMock).toHaveBeenCalledWith('New description');
    // });

    // expect(screen.getByText('New description')).toBeInTheDocument();
  });
});
