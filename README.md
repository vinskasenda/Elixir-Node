#  Elixir Earn Rewards: Validator Node Setup Guide

# Step 1: Claim Sepolia Testnet Tokens
Visit the Infura Faucet to request Sepolia ETH for testing.

# Step 2: Access Elixir Testnet
Go to the Elixir Testnet platform https://testnet-3.elixir.xyz/.

# Step 3: Connect Your Wallet
Link your Metamask wallet to interact with the testnet.

# Step 4: Mint MOCK Tokens
Mint 1,000 MOCK tokens for testing on the network.

# Step 5: Run Your Node
Prepare your validator name and have your wallet address and private key ready.

## Instalasi

1. Clone repository ini ke lokal Anda:

   ```bash
   bash <(curl -s https://raw.githubusercontent.com/vinskasenda/Elixir-Node/main/install.sh)
2. Check Your Node Logs:
   ```bash
   docker logs -f elixir
3. Check Validator Health Status
   ```bash
   curl 127.0.0.1:17690/health | jq
4. Remove / Delete Node
   ```bash
   docker stop elixir && docker rm elixir && docker rmi elixirprotocol/validator:v3


# Official Documentation
For more detailed information, visit the Elixir Validator Documentation https://docs.elixir.xyz/running-an-elixir-validator .
