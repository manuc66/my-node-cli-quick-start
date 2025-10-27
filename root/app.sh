#!/command/with-contenv bash

# Initialize an array for arguments

ARGS=()

if [ -n "$IP" ]; then
    ARGS+=("--ip" "$IP")
fi

if [ -n "$CMDLINE" ]; then
    # Split CMDLINE into words and add to ARGS
    set -- $CMDLINE
    ARGS+=("$@")
fi

cd /app || exit

echo "Starting"
s6-setuidgid node \
    node index.js "${ARGS[@]}"
