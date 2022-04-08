declare var Moralis: any;

const ABI = {"contractName":"Academy","abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"academy_mode","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"start_time","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tenure_length","type":"uint256"}],"name":"TenureActivated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"current_derc_supply","type":"uint256"}],"name":"TenureCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"current_derc_supply","type":"uint256"}],"name":"TenureExpired","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"address","name":"horse_owner","type":"address"},{"indexed":false,"internalType":"uint8","name":"academy_mode","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"derc_requirement","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tenure_length","type":"uint256"}],"name":"TenureInitialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"address","name":"horse_owner","type":"address"},{"indexed":false,"internalType":"uint64","name":"horse_id","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"supplied_derc","type":"uint256"}],"name":"TenureSupplied","type":"event"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_academy","type":"address"}],"name":"set_roles","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_derace_contract","type":"address"},{"internalType":"address","name":"_horse_token","type":"address"},{"internalType":"address","name":"_derc_token","type":"address"}],"name":"set_external_contracts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_horse_owner","type":"address"},{"internalType":"uint8","name":"_academy_mode","type":"uint8"},{"internalType":"uint256","name":"_initial_derc_supply","type":"uint256"},{"internalType":"uint256","name":"_tenure_length","type":"uint256"}],"name":"initialize_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"get_tenure","outputs":[{"internalType":"enum Tenure.TenureState","name":"state","type":"uint8"},{"internalType":"address","name":"horse_owner","type":"address"},{"internalType":"uint64","name":"horse_id","type":"uint64"},{"internalType":"uint8","name":"academy_mode","type":"uint8"},{"internalType":"uint256","name":"initial_derc_supply","type":"uint256"},{"internalType":"uint256","name":"current_derc_supply","type":"uint256"},{"internalType":"uint256","name":"start_time","type":"uint256"},{"internalType":"uint256","name":"tenure_length","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"get_tenure_address","outputs":[{"internalType":"address","name":"tenure_address","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_tenures","outputs":[{"internalType":"uint256[]","name":"all_tenures","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint64","name":"_horse_id","type":"uint64"}],"name":"supply_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"activate_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint256","name":"race_id","type":"uint256"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"cancel_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"bool","name":"paused","type":"bool"}],"name":"set_tenure_paused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint8","name":"academy_mode","type":"uint8"}],"name":"set_tenure_academy_mode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit_funds_to_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to_address","type":"address"}],"name":"withdraw_funds_from_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"}]}
const CHAIN_ID = 80001;
const serverUrl = "https://qaphg75pwxkt.usemoralis.com:2053/server";
const appId = "OUdGGX3gU0g6R9J4sfULWxycb21SAirjMt5cBESU";

const pages = {
  login: document.getElementById("login")!,
  admin: document.getElementById("admin")!,
  standard: document.getElementById("standard")!
}

const static_content = {
  login: document.getElementById('login-button')!,
  logout: document.getElementById('logout-button')!
}

route();

async function route() {
  await Moralis.start({ serverUrl, appId });

  static_content.login.onclick = login;
  static_content.logout.onclick = logout;
  
  if (!await isLoggedIn()) {
    pages.login.style.display = "block";
    pages.admin.style.display = "none";
    pages.standard.style.display = "none";

  } else {
    pages.login.style.display = "none";
    pages.admin.style.display = "block";
    pages.standard.style.display = "none";

    const get_owner_parameters = {
      contractAddress: "0x667b5a01bf2E5dA93e6D355130b76B9411082d31",
      functionName: "owner",
      abi: ABI,
    };

    const message = await Moralis.executeFunction(get_owner_parameters);
    console.log(message);
  }
}

async function fetch_all_tenures() {
  const get_all_tenures_parameters = {
    contractAddress: "0x667b5a01bf2E5dA93e6D355130b76B9411082d31",
    functionName: "get_all_tenures",
    abi: ABI,
  };

  const message = await Moralis.executeFunction(get_all_tenures_parameters);
  console.log(message);
  return message;
}

async function isLoggedIn(): Promise<Boolean> {
  return !!(Moralis.User.current());
}

// async function isAdmin(): Promise<Boolean> {
  // const get_owner_parameters = {
  //   contractAddress: "0x667b5a01bf2E5dA93e6D355130b76B9411082d31",
  //   functionName: "owner",
  //   abi: ABI,
  // };

  // const message = await Moralis.executeFunction(get_owner_parameters);

//   return !!(Moralis.User.current());
// }

/* Authentication code */
async function login() {
  if (!await isLoggedIn()) {
    await Moralis.authenticate({
      signingMessage: "SMR Academy login",
    })
      .then(async function (user) {
        // await Moralis.switchNetwork(CHAIN_ID);
        await route();
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
      })
      // .catch(function (error) {
      //   console.log(error);
      // });
  }
}

async function logout() {
  await Moralis.User.logOut();
  console.log("logged out");
  await route();
}

// academy: 0x667b5a01bf2E5dA93e6D355130b76B9411082d31
// derace: 0x7c8Ac19130613DDE3340E8c1C759560cb929127b
// derc: 0xDc8206875973204a6E5e835009EBE742840Bda3D
// horse: 0xD4d15fAC1a5dea3468803e3dD0420B79a7E7499E