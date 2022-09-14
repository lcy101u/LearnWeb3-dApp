const btn_getMood = document.querySelector('.getMood')
const btn_Mood = document.querySelector('.setMood')
const MoodContractAddress = process.env.MoodContractAddress
const MoodContractABI = [
  {
    "inputs": [],
    "name": "getMood",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_mood",
        "type": "string"
      }
    ],
    "name": "setMood",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
let MoodContract
let signer
const provider = new ethers.providers.Web3Provider(window.ethereum, 'ropsten')
provider.send('eth_requestAccounts', []).then(() => {
  provider.listAccounts().then(accounts => {
    signer = provider.getSigner(accounts[0])
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    )
  })
})


btn_getMood.addEventListener('click', getMood)
btn_Mood.addEventListener('click', setMood)

async function getMood() {
  console.log('Get Mood');
  const getMoodPromise = MoodContract.getMood()
  const Mood = await getMoodPromise
  console.log(Mood);
}

async function setMood() {
  console.log('Set Mood');
  const mood = document.getElementById('mood').value
  const setMoodPromise = await MoodContract.setMood(mood)
  setMoodPromise
}