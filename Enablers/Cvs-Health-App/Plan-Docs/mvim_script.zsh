#!/bin/zsh

# Define the state file
STATE_FILE="\$HOME/bin/data/scripts_state.json"

# Ensure the directory exists
mkdir -p "\$(dirname "\$STATE_FILE")"

# If the state file doesn't exist, initialize it
if [[ ! -f "\$STATE_FILE" ]]; then
  echo '{}' > "\$STATE_FILE"
fi

# Get the last file from the state
LAST_FILE=\$(zsh read_state.zsh mvim_script last_file)

# If a file is provided, use it
if [[ -n "\$1" ]]; then
  FILE="\$HOME/bin/\$1"
else
  # If no file is provided, use the last file
  FILE="\$LAST_FILE"
fi

# If the file doesn't exist, prompt the user to create it
if [[ ! -f "\$FILE" ]]; then
  echo "File \$FILE does not exist. Create it? (y/n)"
  read -k 1 key
  if [[ "\$key" == 'y' ]]; then
    touch "\$FILE"
  else
    echo "Exiting without creating the file."
    exit 1
  fi
fi

# Open the file with mvim
mvim "\$FILE"

# Update the state with the last file used
zsh persist_state.zsh mvim_script last_file "\$FILE"
