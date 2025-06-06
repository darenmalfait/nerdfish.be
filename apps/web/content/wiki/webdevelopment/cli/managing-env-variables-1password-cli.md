---
seo:
  title: Managing environment variables with 1Password CLI for local development
  description:
    A personal guide to managing environment variables securely using 1Password
    CLI and custom Zsh functions. Includes commands for injecting, pulling, and
    pushing secrets.
title: Managing environment variables with 1Password CLI for local development
tags:
  - webdevelopment
  - cli
excerpt:
  A concise guide for using 1Password CLI and Zsh functions to manage
  environment variables securely and efficiently.
date: 2025-01-07T06:30:07.339Z
---

## Prerequisites

1. Install the 1Password CLI:

   ```bash
   brew install 1password-cli
   ```

2. Have a vault named `ENV`, or change the vault in the functions below.

---

## 1. Inject Secrets at Runtime with `openv`

`openv` reads a `.env` file, pulls the specified secrets from 1Password, and
injects them as environment variables into a command’s runtime. This ensures
secrets are never stored in plaintext.

### Usage:

```bash
openv npm run dev
openv -f custom.env npm run dev
```

### Features:

- Supports custom `.env` file paths using the `-f` option.
- Automatically logs in to 1Password if not already signed in.

### Code:

```bash
function openv {
  local env_path=".env"
  while getopts "f:" opt; do
    case $opt in
      f) env_path="$OPTARG" ;;
      *) return 1 ;;
    esac
  done
  shift $((OPTIND-1))

  op whoami || eval $(op signin)
  op run --env-file="${env_path}" -- $@
}
```

---

## 2. Pull Secrets from 1Password with `oppull`

`oppull` retrieves secrets from a 1Password item and writes them to a `.env`
file. It can output raw secret values or `op://` references for use with the
1Password CLI.

### Usage:

```bash
oppull projectname
oppull -f custom.env projectname
oppull -r projectname
oppull -v custom-vault projectname
```

### Features:

- Outputs secrets in raw format or as 1Password references
- Allows specifying a custom .env file path
- Handles 1Password authentication automatically

### Code:

```bash
# Pull secrets from 1Password and write them to a .env file
#
# Usage:
#   oppull item-name                  # Write secrets to default .env file
#   oppull -f custom.env item-name    # Write to custom env file
#   oppull -r item-name              # Write raw secret values (default)
#   oppull item-name                 # Write as op:// references
#   oppull -v vault item-name       # Write to a specific vault
#
# Options:
#   -f <file>  Specify custom env file path (default: .env)
#   -r         Write raw secret values instead of op:// references
#
function oppull {
  local env_path=".env"
  local raw=false
  local environment="local"
  local vault="ENV"  # Default vault
  local item_name="web"  # Default item name

  while getopts "f:rv:" opt; do
    case $opt in
      f) env_path="$OPTARG" ;;
      r) raw=true ;;
      v) vault="$OPTARG" ;;
      *) return 1 ;;
    esac
  done
  shift $((OPTIND-1))

  # Use first argument as item name if provided
  if [ ! -z "$1" ]; then
    item_name="$1"
  fi

  local -a environments
  environments=(local dev prod test staging custom)

  echo "Select environment:"
  integer i=1
  for env in $environments; do
    echo "$i. $env"
    ((i++))
  done
  echo -n "Enter choice [1-${#environments}] (default: local): "
  read choice

  if [ -z "$choice" ]; then
    environment="local"
  else
    # Convert choice to array index (subtract 1)
    index=$((choice - 1))
    if [ "$index" -ge 0 ] && [ "$index" -lt "${#environments}" ]; then
      environment=$environments[index+1]
      if [ "$environment" = "custom" ]; then
        echo -n "Enter custom environment name: "
        read custom_env
        if [ -n "$custom_env" ]; then
          environment="$custom_env"
        else
          environment="local"
        fi
      fi
    else
      echo "Invalid selection, using default: local"
      environment="local"
    fi
  fi

  item_name="${item_name}_${environment}"

  op whoami || eval $(op signin)

  local output_format='.fields[] | select(.value != null)'
  if [ "$raw" = true ]; then
    output_format+=' | "\(.label)=\(.value)"'
  else
    output_format+=" | \"\(.label)=op://${vault}/${item_name}/\(.label)\""
  fi

  if op item get "$item_name" --vault "$vault" --format json | jq -r --arg item "$item_name" "$output_format" > "${env_path}"; then
    echo "✨ Successfully wrote secrets to ${env_path}"
  else
    echo "❌ Failed to write secrets to ${env_path}"
  fi
}
```

---

## 3. Push Secrets to 1Password with `oppush`

`oppush` saves environment variables from a `.env` file to a 1Password item,
creating a secure backup of your secrets.

### Usage:

```bash
oppush projectname
oppush -f custom.env projectname
oppush -v custom-vault projectname
```

### Features:

- Creates backups before overwriting existing items
- Works with custom `.env` file paths
- Stores environment variables as 1Password fields

### Code:

```bash
# Save environment variables from a .env file to 1Password
#
# Usage:
#   oppush item-name              # Save secrets from default .env file
#   oppush -f custom.env item-name # Save secrets from custom env file
#   oppush -v vault item-name     # Save secrets to a specific vault
#
# Options:
#   -f <file>  Specify custom env file path (default: .env)
#
# The secrets will be saved to the ENV vault in 1Password.
# A backup of any existing item with the same name will be created before overwriting.
#
function oppush {
  # Set default values
  local env_path=".env"
  local environment="local"
  local vault="ENV"  # Default vault
  local item_name="web"  # Default item name

  # Parse command line arguments to override defaults if provided
  while getopts "f:v:" opt; do
    case $opt in
      f) env_path="$OPTARG" ;;
      v) vault="$OPTARG" ;;
      *) return 1 ;;
    esac
  done
  shift $((OPTIND-1))

  # Use first argument as item name if provided
  if [ ! -z "$1" ]; then
    item_name="$1"
  fi

  # Check if env file exists
  if [ ! -f "${env_path}" ]; then
    echo "❌ Environment file ${env_path} not found"
    return 1
  fi

  # Environment selection
  local -a environments
  environments=(local dev prod test staging custom)

  echo "Select environment:"
  integer i=1
  for env in $environments; do
    echo "$i. $env"
    ((i++))
  done
  echo -n "Enter choice [1-${#environments}] (default: local): "
  read choice

  if [ -z "$choice" ]; then
    environment="local"
  else
    # Convert choice to array index (subtract 1)
    index=$((choice - 1))
    if [ "$index" -ge 0 ] && [ "$index" -lt "${#environments}" ]; then
      environment=$environments[index+1]
      if [ "$environment" = "custom" ]; then
        echo -n "Enter custom environment name: "
        read custom_env
        if [ -n "$custom_env" ]; then
          environment="$custom_env"
        else
          environment="local"
        fi
      fi
    else
      echo "Invalid selection, using default: local"
      environment="local"
    fi
  fi

  item_name="${item_name}_${environment}"

  # see if we are logged in, will return exit code > 0 if not
  op whoami

  # if we are not logged in, ask for master password
  if [[ $? != 0 ]]; then
    eval $(op signin)
  fi

  # Create a backup of the current item if it exists
  if op item get "$item_name" --vault "$vault" &>/dev/null; then
    echo "⚠️  Item '$item_name' already exists. Creating backup..."
    op item get "$item_name" --vault "$vault" --format json > "${item_name}.backup.json"
  fi

  # Create a temporary JSON file for the new item
  echo '{"title":"'"$item_name"'","category":"LOGIN","fields":[]}' > temp_item.json

  # Read the env file and add each variable to the JSON
  while IFS='=' read -r key value || [ -n "$key" ]; do
    # Skip empty lines and comments
    [[ -z "$key" || "$key" == \#* ]] && continue

    # Remove any quotes from the value
    value=$(echo "$value" | sed -e 's/^["\x27]//' -e 's/["\x27]$//')

    # Add the field to the JSON as a password field
    tmp=$(jq --arg k "$key" --arg v "$value" '.fields += [{"id": $k, "label": $k, "value": $v, "type": "CONCEALED"}]' temp_item.json)
    echo "$tmp" > temp_item.json
  done < "${env_path}"

  # Create or update the item in 1Password
  if op item get "$item_name" --vault "$vault" &>/dev/null; then
    op item delete "$item_name" --vault "$vault" --archive
    op item create --vault "$vault" --template temp_item.json
  else
    op item create --vault "$vault" --template temp_item.json
  fi

  # Clean up
  rm temp_item.json

  if [[ $? == 0 ]]; then
    echo "✨ Successfully saved ${env_path} to 1Password vault '${vault}' as '$item_name'"
  else
    echo "❌ Failed to save ${env_path} to 1Password"
    if [ -f "${item_name}.backup.json" ]; then
      echo "🔄 Restoring from backup..."
      op item delete "$item_name" --vault "$vault" --archive
      op item create --vault "$vault" --template "${item_name}.backup.json"
      rm "${item_name}.backup.json"
    fi
  fi
}
```

---

## Wrapping Up

These Zsh functions make managing environment variables with 1Password both
secure and efficient. By leveraging `openv`, `oppull`, and `oppush`, you can
inject secrets into your workflow seamlessly, pull them from 1Password, and even
back them up to your vault.

Add these functions to your `~/.zshrc` to get started.
