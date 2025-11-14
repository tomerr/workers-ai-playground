# MCP (Model Context Protocol) Integration Guide

## Overview

The Workers AI Playground supports integration with Model Context Protocol (MCP) servers, allowing you to extend AI capabilities with custom tools and data sources.

## Architecture

### Components

1. **McpServers.tsx** (`src/McpServers.tsx`)
   - Main component for managing MCP server connections
   - Handles authentication (OAuth and Bearer tokens)
   - Manages connection state and tool discovery
   - Persists configuration in `sessionStorage`

2. **McpConnection Component**
   - Internal wrapper for the `useMcp` hook
   - Manages individual server connections
   - Supports custom headers for authentication

### Key Features

- **Auto-discovery**: Automatically detects available tools from connected servers
- **OAuth Support**: Handles OAuth authentication flows via popup windows
- **Bearer Token Auth**: Supports custom header-based authentication
- **State Management**: Tracks connection status (disconnected, connecting, connected, error)
- **Session Persistence**: Saves server URL and auth credentials in sessionStorage

## Usage

### Connecting to an MCP Server

1. Enter the MCP server URL in the input field
2. (Optional) Configure authentication:
   - **OAuth**: Click "Authenticate" when prompted
   - **Bearer Token**: Enter custom header key and token
3. Click "Connect" to establish the connection
4. Available tools will automatically appear in the chat interface

### Connection States

| State | Description |
|-------|-------------|
| `not-connected` | No active connection |
| `connecting` | Connection in progress |
| `connected` | Successfully connected, tools available |
| `error` | Connection failed (check error logs) |

### Tool Integration Flow

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│ MCP Server  │─────▶│ McpServers   │─────▶│   App.tsx   │
│  (External) │      │  Component   │      │  (useChat)  │
└─────────────┘      └──────────────┘      └─────────────┘
      │                      │                     │
      │  1. Tool Discovery   │                     │
      │◀─────────────────────┤                     │
      │                      │                     │
      │                      │  2. Update Tools    │
      │                      │────────────────────▶│
      │                      │                     │
      │  3. Tool Execution   │                     │
      │◀─────────────────────┤◀────────────────────┤
      │                      │                     │
      │  4. Tool Results     │                     │
      │─────────────────────▶│────────────────────▶│
```

## API Reference

### McpServers Props

```typescript
interface McpServersProps {
  /** Callback when tools are updated */
  onToolsUpdate?: (tools: Tool[]) => void;
}
```

### ConnectionData Type

```typescript
type ConnectionData = {
  state: "not-connected" | "connecting" | "connected" | "error";
  tools: Tool[];
  error?: string;
  log: LogEntry[];
  authUrl?: string;
  authenticate: () => Promise<void>;
  disconnect: () => void;
  retry: () => void;
  callTool: (name: string, args?: Record<string, unknown>) => Promise<any>;
  clearStorage: () => void;
};
```

## Storage Keys

The following keys are used in `sessionStorage`:

- `mcpServerUrl`: Last connected server URL
- `mcpHeaderKey`: Custom auth header key (default: "Authorization")
- `mcpBearerToken`: Bearer token for authentication

## Error Handling

Common errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| Connection timeout | Server unreachable | Verify URL and network |
| Authentication failed | Invalid credentials | Check OAuth or token |
| Tool execution error | Invalid arguments | Verify tool schema |

## Example: Connecting to a Custom MCP Server

```typescript
// Server URL format
const serverUrl = "https://your-mcp-server.com";

// With Bearer token
const headerKey = "Authorization";
const bearerToken = "your-bearer-token-here";

// Tools will be automatically discovered and passed to App.tsx
```

## Development

### Adding New Authentication Methods

Extend the `McpConnection` component to support additional auth schemes:

```typescript
// Example: API Key authentication
const customHeaders = apiKey
  ? { 'X-API-Key': apiKey }
  : {};
```

### Debugging

Enable debug mode in the `useMcp` hook configuration:

```typescript
useMcp({
  debug: true,  // Logs connection events
  // ...other options
});
```

Check the log panel in the UI for detailed connection information.

## Related Files

- `src/McpServers.tsx` - Main implementation
- `src/App.tsx:74-84` - MCP tools integration with useChat
- `src/App.tsx:88-149` - Tool execution handler
- `src/server/index.ts:42-50` - Backend tool conversion

## Resources

- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [use-mcp Hook Documentation](https://www.npmjs.com/package/use-mcp)
- [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
