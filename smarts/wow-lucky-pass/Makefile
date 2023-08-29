include .env
export

mumbai:
	forge create --rpc-url 'https://rpc-mumbai.matic.today' \
  --constructor-args $(WOW_GURT_CONTRACT_ADDRESS) \
  --mnemonic $(MNEMONIC) \
  --chain-id 80001 \
  --verify \
  src/WowGurtPass.sol:WowGurtPass
