/**
 * Centralized API endpoint definitions
 * Provides type-safe access to all API routes
 */

export const API_ENDPOINTS = {
  INFERENCE: '/api/inference',
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

/**
 * Type guard to check if a string is a valid API endpoint
 */
export function isValidEndpoint(endpoint: string): endpoint is ApiEndpoint {
  return Object.values(API_ENDPOINTS).includes(endpoint as ApiEndpoint);
}
