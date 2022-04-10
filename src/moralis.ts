declare var Moralis: any;
declare var Swal: any;

const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"academy_mode","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"start_time","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tenure_length","type":"uint256"}],"name":"TenureActivated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"current_derc_supply","type":"uint256"}],"name":"TenureCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"current_derc_supply","type":"uint256"}],"name":"TenureExpired","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"address","name":"horse_owner","type":"address"},{"indexed":false,"internalType":"uint8","name":"academy_mode","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"derc_requirement","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tenure_length","type":"uint256"}],"name":"TenureInitialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"address","name":"horse_owner","type":"address"},{"indexed":false,"internalType":"uint64","name":"horse_id","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"supplied_derc","type":"uint256"}],"name":"TenureSupplied","type":"event"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_academy","type":"address"}],"name":"set_roles","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_derace_contract","type":"address"},{"internalType":"address","name":"_horse_token","type":"address"},{"internalType":"address","name":"_derc_token","type":"address"}],"name":"set_external_contracts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_horse_owner","type":"address"},{"internalType":"uint8","name":"_academy_mode","type":"uint8"},{"internalType":"uint256","name":"_initial_derc_supply","type":"uint256"},{"internalType":"uint256","name":"_tenure_length","type":"uint256"}],"name":"initialize_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"get_tenure","outputs":[{"internalType":"enum Tenure.TenureState","name":"state","type":"uint8"},{"internalType":"address","name":"horse_owner","type":"address"},{"internalType":"uint64","name":"horse_id","type":"uint64"},{"internalType":"uint8","name":"academy_mode","type":"uint8"},{"internalType":"uint256","name":"initial_derc_supply","type":"uint256"},{"internalType":"uint256","name":"current_derc_supply","type":"uint256"},{"internalType":"uint256","name":"start_time","type":"uint256"},{"internalType":"uint256","name":"tenure_length","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"get_tenure_address","outputs":[{"internalType":"address","name":"tenure_address","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_tenures","outputs":[{"internalType":"uint256[]","name":"all_tenures","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint64","name":"_horse_id","type":"uint64"}],"name":"supply_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"activate_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint256","name":"race_id","type":"uint256"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"cancel_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"bool","name":"paused","type":"bool"}],"name":"set_tenure_paused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint8","name":"academy_mode","type":"uint8"}],"name":"set_tenure_academy_mode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit_funds_to_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to_address","type":"address"}],"name":"withdraw_funds_from_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const CHAIN_ID = 80001;
const serverUrl = "https://qaphg75pwxkt.usemoralis.com:2053/server";
const appId = "OUdGGX3gU0g6R9J4sfULWxycb21SAirjMt5cBESU";

const pages = {
  landing: document.getElementById("landing")!,
  login_failed: document.getElementById("login-failed")!,
  admin: document.getElementById("admin")!,
  standard: document.getElementById("standard")!
}

const static_content = {
  login_failed_button: document.getElementById('login-failed-button')!,
  table: document.getElementById('table')!
}

initialize();

async function initialize() {
  await Moralis.start({ serverUrl, appId });

  static_content.login_failed_button.onclick = reload;

  route();
}

async function route() {
  const current_user = Moralis.User.current();

  if (!await isLoggedIn(current_user)) {
    pages.landing.style.display = "block";
    pages.login_failed.style.display = "none";
    pages.admin.style.display = "none";
    pages.standard.style.display = "none";
  }

  await authenticate()
    .then(async function () {
      if (await isAdmin(Moralis.User.current())) {
        pages.landing.style.display = "none";
        pages.login_failed.style.display = "none";
        pages.admin.style.display = "block";
        pages.standard.style.display = "none";
        await build_admin_dashboard();
      } else {
        pages.landing.style.display = "none";
        pages.login_failed.style.display = "none";
        pages.admin.style.display = "none";
        pages.standard.style.display = "block";
        await build_standard_dashboard();
      }
    })
    .catch(function (error) {
      console.log(error);
      pages.landing.style.display = "none";
      pages.login_failed.style.display = "block";
      pages.admin.style.display = "none";
      pages.standard.style.display = "none";
    });
}

async function reload() {
  window.location.reload();
}

async function fetch_all_tenures() {
  const get_all_tenures_parameters = {
    contractAddress: "0x667b5a01bf2E5dA93e6D355130b76B9411082d31",
    functionName: "get_all_tenures",
    abi: ABI,
  };

  const tenure_ids = await Moralis.executeFunction(get_all_tenures_parameters);

  let tenures: any = [];
  for (let i = 0; i < tenure_ids.length; i++) {
    const rawTenure = await fetch_tenure(tenure_ids[i])
    const tenure = {
      id: tenure_ids[i],
      academy_mode: rawTenure.academy_mode,
      current_derc_supply: rawTenure.current_derc_supply,
      horse_id: rawTenure.horse_id,
      horse_owner: rawTenure.horse_owner,
      initial_derc_supply: rawTenure.initial_derc_supply,
      start_time: rawTenure.start_time,
      state: rawTenure.state,
      tenure_length: rawTenure.tenure_length
    };
    tenures.push(tenure);
  }
  return tenures;
}

async function fetch_tenure(tenure_id) {
  const get_tenure_parameters = {
    contractAddress: "0x667b5a01bf2E5dA93e6D355130b76B9411082d31",
    functionName: "get_tenure",
    abi: ABI,
    params: {
      tenure_id: tenure_id
    }
  };

  const message = await Moralis.executeFunction(get_tenure_parameters);
  return message;
}

async function build_admin_dashboard() {
  const tenures = await fetch_all_tenures();
  console.log(tenures);

  let table_data = "<tr><th>ID</th><th>State</th><th>Horse ID</th><th>Length</th><th>End Time</th><th>Actions</th></tr>";
  const separator = "</td><td>"

  for await (const i of tenures) {
    const cancel_button = `<button onclick="javascript:cancel_prompt(${i.id})">Cancel</button>`;

    table_data += "<tr><td>";
    table_data += i.id + separator;
    table_data += i.state + separator;
    table_data += i.horse_id + separator;
    table_data += i.length + separator;
    table_data += "placeholder" + separator;
    table_data += cancel_button;
    table_data += "</td></tr>";
  }

  static_content.table.innerHTML = table_data;
}

async function build_standard_dashboard() {
  
}

async function cancel_prompt(id) {
  Swal.fire({
    title: 'Cancel Tenure',
    text: 'Are you sure you want to cancel this tenure? The horse asset will be returned to its owner.',
    showCancelButton: false,
    confirmButtonText: 'Yes, Cancel',
  }).then( async (result) => {
    if (result.isConfirmed) {
      await cancel_tenure(id);
    }
  })
}

async function cancel_tenure(id) {
  Swal.fire('Cancelled #' + String(id), '', 'success');
}

async function isLoggedIn(user): Promise<Boolean> {
  return (user);
}

async function isAdmin(user): Promise<Boolean> {
  const get_owner_parameters = {
    contractAddress: "0x667b5a01bf2E5dA93e6D355130b76B9411082d31",
    functionName: "owner",
    abi: ABI,
  };

  const message = await Moralis.executeFunction(get_owner_parameters);

  return String(message).toLowerCase() === String(user.get("ethAddress").toLowerCase());
}

async function authenticate() {
  await Moralis.authenticate({
    signingMessage: "SMR Academy login",
  });
}

var isNumber = function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

// academy: 0x667b5a01bf2E5dA93e6D355130b76B9411082d31
// derace: 0x7c8Ac19130613DDE3340E8c1C759560cb929127b
// derc: 0xDc8206875973204a6E5e835009EBE742840Bda3D
// horse: 0xD4d15fAC1a5dea3468803e3dD0420B79a7E7499E