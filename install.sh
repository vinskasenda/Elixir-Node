#!/bin/bash

set -e

log() {
    local level=$1
    local message=$2
    echo "[$level] $message"
}

curl -s https://raw.githubusercontent.com/vinskasenda/Elixir-Node/main/icon.sh | bash
sleep 5

echo -e "\n\n----------------- Auto Install -----------------\n"
sleep 2

echo -e "\n\n----------------- Elixir Network Node -----------------n"
sleep 2

log "info" "1. Updating and upgrading system"
sudo apt update && sudo apt upgrade -y

log "info" "2. Installing dependencies"
sudo apt install curl iptables build-essential git wget lz4 jq make gcc nano automake autoconf tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip -y

log "info" "3. Removing conflicting Docker packages"
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do 
    sudo apt-get remove -y $pkg || true  
done

log "info" "4. Installing Docker dependencies"
sudo apt-get install ca-certificates curl gnupg -y

log "info" "5. Adding Docker GPG key and repository"
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

log "info" "6. Installing Docker"
sudo apt update -y && sudo apt upgrade -y
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

log "info" "7. Verifying Docker installation"
docker --version

log "info" "8. Validator Private Key Generation"
echo "Please generate your EVM Metamask wallet manually and save the private and public keys."

log "info" "9. Asking for user inputs for validator configuration"
read -p "Enter your Validator Name: " validator_name
read -p "Enter your Wallet Address: " wallet_pub_key
read -p "Enter your Wallet Private Key: " wallet_priv_key

log "info" "10. Creating validator.env"
cat <<EOF > validator.env
ENV=testnet-3
STRATEGY_EXECUTOR_DISPLAY_NAME=$validator_name
STRATEGY_EXECUTOR_BENEFICIARY=$wallet_pub_key
SIGNER_PRIVATE_KEY=$wallet_priv_key
EOF

log "info" "11. Pulling Elixir Validator Docker image"
docker pull elixirprotocol/validator:v3

log "info" "12. Running Elixir Validator"
docker run -d \
  --env-file ./validator.env \
  --name elixir \
  --restart unless-stopped \
  -p 17690:17690 \
  elixirprotocol/validator:v3

log "info" "13. To check Docker logs for connectivity, run: docker logs -f elixir"
log "info" "14. Wait for validator authorization. It may take a minute or so."

log "info" "15. To verify Validator Health Status, run: curl 127.0.0.1:17690/health | jq"
log "info" "If the response is 'OK', the validator is healthy."
log "info" "Setup Complete"
