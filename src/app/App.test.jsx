import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';

// Mock matchMedia for jsdom compatibility
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('AuraShell Component DOM Rendering Tests', () => {
  it('should render Header brand logo and main navigation links', () => {
    render(
      <Header
        activeRoute="dashboard"
        hasNotification={false}
        onClearNotification={vi.fn()}
      />
    );
    expect(screen.getByText('AuraShell')).toBeDefined();
    expect(screen.getByText('Dashboard')).toBeDefined();
    expect(screen.getByText('Projects')).toBeDefined();
  });

  it('should render Sidebar with core menu links', () => {
    render(
      <Sidebar
        isCollapsed={false}
        onToggleCollapse={vi.fn()}
        activeRoute="dashboard"
      />
    );
    expect(screen.getByText('Analytics')).toBeDefined();
    expect(screen.getByText('Reports')).toBeDefined();
    expect(screen.getByText('Settings')).toBeDefined();
  });

  it('should render Footer with active route info and clock labels', () => {
    render(<Footer activePageName="Dashboard" />);
    expect(screen.getByText('Active:')).toBeDefined();
    expect(screen.getByText('Status:')).toBeDefined();
    expect(screen.getByText('Uptime:')).toBeDefined();
  });
});
