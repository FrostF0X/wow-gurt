include .env
export

anvil:
	pkill -9 -f anvil || true
	bash -c 'nohup anvil -m ${LOCAL_MNEMONIC} &>/dev/null & jobs -p %1'

deploy-anvil : anvil
	export FUND_ADDRESS="0x90adE45a1B3ebE40CeBf519f680CCA82ff5d7F0e" && \
	forge script ./script/ApeLuckyCoinDeployLocal.s.sol:ApeLuckyCoinDeployLocal \
  	--sender '0x90ade45a1b3ebe40cebf519f680cca82ff5d7f0e' \
	--rpc-url http://localhost:8545 \
	--mnemonics ${LOCAL_MNEMONIC} \
	--chain-id 31337 \
	--etherscan-api-key test --broadcast

deploy-mainnet:
	export APE_COIN_ADDRESS="0xB7b31a6BC18e48888545CE79e83E06003bE70930" && \
	forge script ./script/ApeLuckyCoinDeploy.s.sol:ApeLuckyCoinDeploy \
  	--skip-simulation \
  	--gas-estimate-multiplier 100 \
  	--sender '0x1A5bb078AcbB76B2D3873D6e94c5D553F2F6bD44' \
  	--chain-id 137 \
  	--rpc-url https://polygon-mainnet.infura.io/v3/4e6ce2ff7f6e4835a57b6f05854b7c4a \
  	--optimizer-runs 200 \
  	--etherscan-api-key "TQRZQT7PR8UEGAZNEV8AKVP8C2SAJDT1VE" \
  	--mnemonics ${MAINNET_MNEMONIC} \
  	--broadcast

tests:
	forge test -vvv -w
