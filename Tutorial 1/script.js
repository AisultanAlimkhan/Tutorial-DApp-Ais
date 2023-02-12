const contractAddress = "0xB61aEF6BEC64b22b772Ad3afc31D781Fa385C136";   
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_note",
				"type": "string"
			}
		],
		"name": "setNote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNote",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let contract;
let signer;
  const provider = new ethers.providers.Web3Provider(window.ethereum,5); // Goerli chain

  provider.send("eth_requestAccounts", []).then(
    () => {
        provider.listAccounts().then((accounts) => {
            signer = provider.getSigner(accounts[0]);
            console.log(signer);
            contract = new ethers.Contract(contractAddress,contractABI,signer)
        }
        );
    }
    )

  async function getNote() {
    const getNotePromise = contract.getNote();
    const note = await getNotePromise;
    console.log(note);
  }
  
  async function setNote() {
    const note = document.getElementById("inputNote").value;
    console.log(note);
    await contract.setNote(note);
  }