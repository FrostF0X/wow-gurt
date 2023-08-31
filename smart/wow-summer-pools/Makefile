include .env
export

anvil :; anvil -m ${LOCAL_MNEMONIC}

deploy-anvil :
	forge script ./script/WowSummerPoolDeploy.s.sol:WowSummerPoolDeploy --rpc-url http://localhost:8545 --private-key 0xa5dded40d71f99cad8c589baea8439df5b7e3ed5dde371d6ef78ab8db1d0bf5a --etherscan-api-key test --broadcast

deploy-goerli :
	forge script ./script/WowSummerPoolDeploy.s.sol:WowSummerPoolDeploy \
  --skip-simulation \
  --gas-estimate-multiplier 100 \
  --sender '0x1A5bb078AcbB76B2D3873D6e94c5D553F2F6bD44' \
  --chain-id 84531 \
  --rpc-url https://base-goerli.public.blastapi.io \
  --optimizer-runs 200 \
  --etherscan-api-key "TQRZQT7PR8UEGAZNEV8AKVP8C2SAJDT1VE" \
  --mnemonics ${GOERLI_MNEMONIC} \
  --broadcast

deploy-mainnet:
	forge script ./script/WowSummerPoolDeploy.s.sol:WowSummerPoolDeploy \
  --skip-simulation \
  --gas-estimate-multiplier 100 \
  --sender '0x1A5bb078AcbB76B2D3873D6e94c5D553F2F6bD44' \
  --chain-id 8453 \
  --rpc-url https://rpc.ankr.com/base/3af1b873a20ee560b8c5a2afb845edb469296b68270ab68cc54494d166aa30e8 \
  --optimizer-runs 200 \
  --etherscan-api-key "TQRZQT7PR8UEGAZNEV8AKVP8C2SAJDT1VE" \
  --mnemonics ${MAINNET_MNEMONIC} \
  --broadcast

mint:
	forge script ./script/Mint.s.sol:Mint \
  --skip-simulation \
  --gas-estimate-multiplier 100 \
  --sender ${FROM} \
  --unlocked ${FROM} \
  --chain-id 8453 \
  --with-gas-price 137178348 \
  --rpc-url https://rpc.ankr.com/base/3af1b873a20ee560b8c5a2afb845edb469296b68270ab68cc54494d166aa30e8 \
  --etherscan-api-key "TQRZQT7PR8UEGAZNEV8AKVP8C2SAJDT1VE" \
  --mnemonics ${MAINNET_MNEMONIC} \
  --broadcast

addresses:
	export MNEMONIC
	forge script ./script/Addresses.s.sol:Addresses \
  --skip-simulation \
  --gas-estimate-multiplier 100 \
  --sender '0x1A5bb078AcbB76B2D3873D6e94c5D553F2F6bD44' \
  --chain-id 8453 \
  --with-gas-price 1 \
  --rpc-url https://rpc.ankr.com/base/3af1b873a20ee560b8c5a2afb845edb469296b68270ab68cc54494d166aa30e8 \
  --etherscan-api-key "TQRZQT7PR8UEGAZNEV8AKVP8C2SAJDT1VE" \
  --mnemonics ${MAINNET_MNEMONIC} \
  --broadcast

send-to:
	forge script ./script/SendTo.s.sol:SendTo \
  --skip-simulation \
  --gas-estimate-multiplier 100 \
  --sender '0x1A5bb078AcbB76B2D3873D6e94c5D553F2F6bD44' \
  --chain-id 8453 \
  --with-gas-price 121297772 \
  --rpc-url https://rpc.ankr.com/base/3af1b873a20ee560b8c5a2afb845edb469296b68270ab68cc54494d166aa30e8 \
  --etherscan-api-key "TQRZQT7PR8UEGAZNEV8AKVP8C2SAJDT1VE" \
  --mnemonics ${MAINNET_MNEMONIC} \
  --broadcast

deploy-pass-mainnet:
	forge script ./script/WowSummerPools10GamesPassDeploy.s.sol:WowSummerPools10GamesPassDeploy \
  --sender '0x1A5bb078AcbB76B2D3873D6e94c5D553F2F6bD44' \
  --chain-id 8453 \
  --rpc-url https://mainnet.base.org \
  --optimizer-runs 200 \
  --gas-limit 65000 \
  --gas-price '0.00001' \
  --etherscan-api-key "TQRZQT7PR8UEGAZNEV8AKVP8C2SAJDT1VE" \
  --mnemonics ${MAINNET_MNEMONIC} \
  --broadcast

tests:
	forge test -vv
