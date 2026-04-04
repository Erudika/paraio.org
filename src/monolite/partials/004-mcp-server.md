---
title: MCP Server
category: Getting Started
---

The Para MCP server exposes Para's backend services over the Model Context Protocol, 
enabling AI assistants like Claude to interact with your Para backend for configuration management,
data operations, and full-text search.

### 1. Enable the MCP Server in Para

The MCP server is disabled by default. To enable the Para MCP server, choose either 
"r" for read-only mode, or "rw" for full access, then add this to your `application.conf`:

```ini
# Para MCP Mode (off, r=read-only, rw=read-write)
para.mcp_server_mode = "rw"
```

**MCP Server Modes:**

| Mode | Value | Description |
|------|-------|-------------|
| **Off** | `off` | MCP server disabled (default) |
| **Read-only** | `r` | Only read operations allowed (recommended for production) |
| **Read+Write** | `rw` | Full CRUD access including create/update/delete operations |

### 2. Get Your Para App Bearer Token

The MCP server requires authentication using a JWT Bearer token (see 'super tokens' below).

**Option 1:** Generate the token using Para CLI

1. Start Para server and run `npx para-cli setup`
2. Configure Para CLI to connect to your Para app
3. Run `npx para-cli new-jwt --print`
4. Copy the access token and paste it in your MCP configuration as shown below

**Option 2:** Genearte the token manually using a JWT library of your choice
1. Copy the secret key for your Para app
2. Follow the section on "super tokens" below for the exact format
3. Generate and sign a new JWT with the secret key as a signing secret.

### 3. Configure Your MCP Client

**Claude Desktop and Claude Code**

Add this configuration to your MCP settings file:

**Location:**
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "para": {
      "type": "http",
      "url": "http://localhost:8080/v1/_mcp",
      "mode": "streamable",
      "headers": {
        "Authorization": "Bearer {PARA_JWT_TOKEN}"
      }
    }
  }
}
```

### 4. Test the Connection

Restart your MCP client (Claude Desktop/Code) and verify the connection.
Usually the commands are `/mcp refresh` and `/mcp list`. You should see Para as an MCP server.

### Available Resources

Resources provide browsable context that can be loaded into your AI agent's context window.

| Resource | URI | Description |
|----------|-----|-------------|
| **Root Index** | `para:///` | Basic server info and overview |
| **Para Server metadata** | `para:///metadata` | Health status, modules, current app, version, etc. |
| **Configuration Reference** | `para:///config` | Complete Para configuration documentation (Markdown) |

**Example usage in your AI agent:**
```
Show me the para:///metadata resource
What configuration options are available? (para:///config)
```

### Available Tools

Tools are actions that AI agents can invoke to query or modify Para data.

### Read-Only Tools (Mode: `r` or `rw`)

| Tool | Description | Parameters |
|------|-------------|------------|
| **config_search** | Fuzzy search across configuration metadata | `query` (string, optional), `limit` (int, default 10) |
| **get_config_by_key** | Get info about a single configuration property | `key` config key |
| **list_types** | A list of all Para object types which are currently registered in Para |  |
| **search** | Full-text search for Para objects using Lucene syntax | `q` (string, default `*`), `type` (string, optional), `limit` (int, default 10), `page` (int, default 1) |
| **get_user_by_email** | Find a user by email address | `email` (string, required) |
| **get_object_by_id** | Retrieve a Para object by ID | `objectId` (string, required) |
| **get_app_settings** | A list of all Para app settings for the current app |  |

### Write Tools (Mode: `rw` only)

| Tool | Description | Parameters |
|------|-------------|------------|
| **create_app** | Create a new Para application | `appIdentifier` (required), `name`, `creatorId`, `sharedIndex`, `sharedTable` **Root app only** |
| **create_object** | Create a new Para object | Dynamically shows which fields are required |
| **update_object** | Update an existing Para object | `objectId` (required) and also shows required fields |
| **delete_object** | Delete a Para object | `objectId` (required) + confirmation |
| **put_app_setting** | Adds a new Para app setting for the current app | `key` (string), `value` (any) |
| **rebuild_index** | Rebuilds the search index for the current app | |
| **clear_cache** | Clears the object cache for the current app | |

## Usage Examples

**Ask your AI agent:**
```
Search for all Para configuration options related to security
```

**AI agent will invoke:**
```
config_search(query="security", limit=10)
```

**Ask your AI agent:**
```
Find all users with email addresses ending in @example.com
```

**AI agent will invoke:**
```
search(q="email:*@example.com", type="user", limit=10)
```

**Ask your AI agent:**
```
Get the details for object ID abc123
```

**AI agent will invoke:**
```
get_object_by_id(objectId="abc123")
```

**Ask Claude:**
```
Create a new Para app called "blog-api"
```

**AI agent will invoke:**
```
create_app(appIdentifier="blog-api", name="Blog API")
```

The MCP server automatically redacts sensitive configuration values as `<redacted>` instead of printing out the actual value.

## Troubleshooting

### Connection Failed

**Problem:** Claude can't connect to Para MCP server

**Solutions:**
1. Verify Para server is running: `curl http://localhost:8080/v1/_mcp`
2. Check if MCP server is enabled and your Bearer JWT is valid
3. Verify firewall allows connections on port 8080
4. Check Para logs for MCP server startup messages

If Para is behind a reverse proxy or load balancer use this system property when starting Para:

```properties
spring.ai.mcp.server.base-url=https://api.example.com
```