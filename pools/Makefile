include .env
export

anvil :; anvil -m ${MNEMONIC}

deploy-anvil :
	forge script ./script/WowSummerPoolDeploy.s.sol:WowSummerPoolDeploy --rpc-url http://localhost:8545 --private-key 0xa5dded40d71f99cad8c589baea8439df5b7e3ed5dde371d6ef78ab8db1d0bf5a --etherscan-api-key test --broadcast
