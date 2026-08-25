import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import production views for unified test mapping
import ClientAppointmentsPage from '../client/page';
import LoginPage from '../login/page';
import SignupPage from '../signup/page';

// Mock Next.js navigation primitives to protect router states
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock API communication services to decouple frontend suites from transport layers
jest.mock('../../services/api', () => ({
  appointmentApi: {
    getClientAppointments: jest.fn().mockResolvedValue([
      { id: 101, serviceId: 1, staffId: 2, appointmentDate: '2026-06-15', startTime: '10:00', endTime: '11:00', status: 'CONFIRMED', notes: 'First session' }
    ]),
    cancelAppointment: jest.fn().mockResolvedValue({ success: true }),
  },
  api: {
    post: jest.fn().mockResolvedValue({
      data: { token: 'mock-jwt-token-xyz', user: { id: 6, username: 'sonya' } }
    }),
  },
}));

describe('StyleHub Enterprise Frontend - Unified Component Test Suite', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // --- 1. Client Appointments View Validation ---
  describe('ClientAppointmentsPage Component', () => {
    
    it('renders appointment records correctly upon successful async data fetch', async () => {
      render(<ClientAppointmentsPage />);

      // Ensure loading state handles gracefully before data settlement
      expect(screen.getByText(/loading your appointments/i)).toBeInTheDocument();

      // Wait for records to resolve through mock service bridge
      await waitFor(() => {
        expect(screen.getByText(/Service #1/i)).toBeInTheDocument();
        expect(screen.getByText(/2026-06-15/i)).toBeInTheDocument();
      });
    });

    it('triggers secure cancellation payload dispatch when confirmed', async () => {
      window.confirm = jest.fn().mockReturnValue(true);

      render(<ClientAppointmentsPage />);

      let cancelButton;
      await waitFor(() => {
        cancelButton = screen.getByRole('button', { name: /cancel/i });
      });

      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.getByText(/appointment cancelled successfully/i)).toBeInTheDocument();
      });
    });
  });

  // --- 2. Authentication Login View Validation ---
  describe('LoginPage Component', () => {
    
    it('renders secure sign-in controls and demo blocks', () => {
      render(<LoginPage />);

      expect(screen.getByPlaceholderText(/e\.g\. john_doe or name@example\.com/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
      expect(screen.getByText(/demo accounts note:/i)).toBeInTheDocument();
    });

    it('handles state binding changes and executes successful credential submission', async () => {
      render(<LoginPage />);

      const userInput = screen.getByPlaceholderText(/e\.g\. john_doe or name@example\.com/i);
      const passInput = screen.getByPlaceholderText(/••••••••/i);
      const submitBtn = screen.getByRole('button', { name: /^login$/i });

      fireEvent.change(userInput, { target: { name: 'usernameOrEmail', value: 'sonya' } });
      fireEvent.change(passInput, { target: { name: 'password', value: '123456' } });

      expect(userInput.value).toBe('sonya');
      expect(passInput.value).toBe('123456');

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(localStorage.getItem('stylehub_token')).toBe('mock-jwt-token-xyz');
      });
    });
  });

  // --- 3. Registration Signup View Validation ---
  describe('SignupPage Component', () => {
    
    it('renders full onboarding identity form inputs', () => {
      render(<SignupPage />);

      expect(screen.getByPlaceholderText(/e\.g\. john_doe/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/e\.g\. john doe/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/name@example\.com/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/\+12345678901/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it('accepts valid state updates across enrollment parameters', () => {
      render(<SignupPage />);

      const usernameInput = screen.getByPlaceholderText(/e\.g\. john_doe/i);
      fireEvent.change(usernameInput, { target: { name: 'username', value: 'new_client_99' } });

      expect(usernameInput.value).toBe('new_client_99');
    });
  });

});