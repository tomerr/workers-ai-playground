import { describe, it, expect } from 'vitest';
import { API_ENDPOINTS, isValidEndpoint } from './apiEndpoints';

describe('API Endpoints', () => {
  it('should have correct endpoint paths', () => {
    expect(API_ENDPOINTS.INFERENCE).toBe('/api/inference');
  });

  it('should validate valid endpoints', () => {
    expect(isValidEndpoint('/api/inference')).toBe(true);
  });

  it('should reject invalid endpoints', () => {
    expect(isValidEndpoint('/api/invalid')).toBe(false);
    expect(isValidEndpoint('')).toBe(false);
    expect(isValidEndpoint('/unknown')).toBe(false);
  });

  it('should be readonly', () => {
    // TypeScript should prevent this at compile time
    // @ts-expect-error - Cannot assign to 'INFERENCE' because it is a read-only property
    API_ENDPOINTS.INFERENCE = '/changed';
  });
});
