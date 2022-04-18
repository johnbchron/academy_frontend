
declare var Moralis: any;
declare var Swal: any;
declare var Web3: any;

const CHAIN_ID = 137;
const ACADEMY_CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"academy_mode","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"start_time","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tenure_length","type":"uint256"}],"name":"TenureActivated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"current_derc_supply","type":"uint256"}],"name":"TenureCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"current_derc_supply","type":"uint256"}],"name":"TenureExpired","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"address","name":"horse_owner","type":"address"},{"indexed":false,"internalType":"uint8","name":"academy_mode","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"derc_requirement","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tenure_length","type":"uint256"}],"name":"TenureInitialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tenure_id","type":"uint256"},{"indexed":false,"internalType":"address","name":"horse_owner","type":"address"},{"indexed":false,"internalType":"uint64","name":"horse_id","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"supplied_derc","type":"uint256"}],"name":"TenureSupplied","type":"event"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_academy","type":"address"}],"name":"set_roles","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_derace_contract","type":"address"},{"internalType":"address","name":"_horse_token","type":"address"},{"internalType":"address","name":"_derc_token","type":"address"}],"name":"set_external_contracts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_horse_owner","type":"address"},{"internalType":"uint8","name":"_academy_mode","type":"uint8"},{"internalType":"uint256","name":"_initial_derc_supply","type":"uint256"},{"internalType":"uint256","name":"_tenure_length","type":"uint256"}],"name":"initialize_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"get_tenure","outputs":[{"internalType":"enum Tenure.TenureState","name":"state","type":"uint8"},{"internalType":"address","name":"horse_owner","type":"address"},{"internalType":"uint64","name":"horse_id","type":"uint64"},{"internalType":"uint8","name":"academy_mode","type":"uint8"},{"internalType":"uint256","name":"initial_derc_supply","type":"uint256"},{"internalType":"uint256","name":"current_derc_supply","type":"uint256"},{"internalType":"uint256","name":"start_time","type":"uint256"},{"internalType":"uint256","name":"tenure_length","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"get_tenure_address","outputs":[{"internalType":"address","name":"tenure_address","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_tenures","outputs":[{"internalType":"uint256[]","name":"all_tenures","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint64","name":"_horse_id","type":"uint64"}],"name":"supply_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"activate_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint256","name":"race_id","type":"uint256"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"}],"name":"cancel_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"bool","name":"paused","type":"bool"}],"name":"set_tenure_paused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint8","name":"academy_mode","type":"uint8"}],"name":"set_tenure_academy_mode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit_funds_to_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tenure_id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to_address","type":"address"}],"name":"withdraw_funds_from_tenure","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const ERC20_CONTRACT_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
const ERC721_CONTRACT_ABI = [{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
const ACADEMY_CONTRACT_ADDRESS = "0x71C6EC2058175480b035d69D963C268E4CdF7614"// "0x3930f79b70aD5BC4605ac2db04872BE9D79c6ce4"; //
const DERC_CONTRACT_ADDRESS = "0xb35fcbcf1fd489fce02ee146599e893fdcdc60e6"
const HORSE_CONTRACT_ADDRESS = "0x9d77cb4D8371736e2A2b2bfAa677b7841cDc8fC1";

const CONFIRMATION_WAIT_COUNT = 5;

const serverUrl = "https://qaphg75pwxkt.usemoralis.com:2053/server";
const appId = "OUdGGX3gU0g6R9J4sfULWxycb21SAirjMt5cBESU";

var admin;
var tenures;

function zero_pad(str, len) {
  while (str.length < len)
    str = '0' + str;
  return str;
}

const pages = {
  landing: document.getElementById("landing")!,
  admin: document.getElementById("admin")!,
  standard: document.getElementById("standard")!
}

const static_content = {
  admin_table: document.getElementById('admin-table')!,
  login_button: document.getElementById("login-button")!,
  tip: document.getElementById("tip")!,
  standard_table: document.getElementById('standard-table')!,
  form: document.getElementById('form')!
}

initialize();

static_content.form.addEventListener("submit", submit_form, true);

async function initialize() {
  await Moralis.start({ serverUrl, appId });

  const current_user = Moralis.User.current();

  route("login");

  // TODO: use cookies to remember sessions
  /*if (!await isLoggedIn(current_user)) {
    route("login");
  }*/
}

static_content.login_button.addEventListener("click", async () => { await route("authenticate") });

async function route(page: "login" | "authenticate") {
  if (page === "login") {
    const button: any = static_content.login_button;
    button.disabled = false;

    static_content.tip.innerHTML = "This will initiate a transaction in MetaMask to allow you to log in.";

    pages.landing.style.display = "block";
    pages.admin.style.display = "none";
    pages.standard.style.display = "none";
  } else if (page === "authenticate") {
    await authenticate()
      .then(async function () {
        admin = await isAdmin(Moralis.User.current());
        if (admin) {
          pages.landing.style.display = "none";
          pages.admin.style.display = "block";
          pages.standard.style.display = "none";
          await build_admin_dashboard();
        } else {
          pages.landing.style.display = "none";
          pages.admin.style.display = "none";
          pages.standard.style.display = "block";
          await build_standard_dashboard();
        }
      })
      .catch(function (error) {
        console.log(error);
        pages.landing.style.display = "block";
        const button: any = static_content.login_button;
        button.disabled = false;
        static_content.tip.innerHTML = "Login failed. Please make sure MetaMask is on the right network and try again.";
        pages.admin.style.display = "none";
        pages.standard.style.display = "none";
      });
    }
}

async function reload_dashboard() {
  if (admin) {
    await build_admin_dashboard();
  } else {
    await build_standard_dashboard();
  }
}

async function reload() {
  window.location.reload();
}

async function fetch_all_tenures() {
  const get_all_tenures_parameters = {
    contractAddress: ACADEMY_CONTRACT_ADDRESS,
    functionName: "get_all_tenures",
    abi: ACADEMY_CONTRACT_ABI,
  };

  const tenure_ids = await Moralis.executeFunction(get_all_tenures_parameters);
  console.log("got list of tenures");

  let tenures: any = [];
  for (let i = 0; i < tenure_ids.length; i++) {
    try {
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
    } catch (e) {
      console.log("unable to fetch tenure:", e);
    }
  }
  return tenures;
}

async function fetch_tenure(tenure_id) {
  const get_tenure_parameters = {
    contractAddress: ACADEMY_CONTRACT_ADDRESS,
    functionName: "get_tenure",
    abi: ACADEMY_CONTRACT_ABI,
    params: {
      tenure_id: tenure_id
    }
  };

  const message = await Moralis.executeFunction(get_tenure_parameters);
  return message;
}

function data_cell(column_name, data) {
  return `<div class="column"><p>` + column_name + `</p><data>` + data + `</data></div>`;
}

function name_cell(column_name) {
  return `<div class="column"><p>` + column_name + `</p><data></data></div>`;
}

async function build_admin_dashboard() {
  tenures = await fetch_all_tenures();

  let table_data = "";

  const column_start = `<div class="column"><p>`;
  const separator = `</p><data>`
  const column_end = `</data></div>`;

  let index;
  for (index = tenures.length - 1; index >= 0; index--) {
    const i = tenures[index];
    const cancel_button = `<button class="btn btn__action" onclick="javascript:cancel_prompt(${i.id})">cancel</button>`;
    const supply_button = `<button class="btn btn__action" onclick="javascript:supply_prompt(${i.id})">supply</button>`;
    const activate_button = `<button class="btn btn__action" onclick="javascript:activate_prompt(${i.id})">activate</button>`;
    const pause_button = `<button class="btn btn__action" onclick="javascript:pause_prompt(${i.id})">pause</button>`;
    const unpause_button = `<button class="btn btn__action" onclick="javascript:unpause_prompt(${i.id})">unpause</button>`;
    const deposit_button = `<button class="btn btn__action" onclick="javascript:deposit_prompt(${i.id})">deposit</button>`;
    const withdraw_button = `<button class="btn btn__action" onclick="javascript:withdraw_prompt(${i.id})">withdraw</button>`;
    const change_mode_button = `<button class="btn btn__action" onclick="javascript:change_mode_prompt(${i.id})">change Mode</button>`;

    table_data += `<div class="row">`;
    switch (i.state) {
      case 0: {
        table_data += "<div class=\"columns-2\">";
        table_data += name_cell(zero_pad(i.id, 6));
        table_data += data_cell("state", "initialized");
        table_data += data_cell("mode", i.academy_mode);
        table_data += data_cell("owner", abbreviate_address(i.horse_owner));
        table_data += data_cell("allowed length", unix_time_to_duration(i.tenure_length));
        table_data += data_cell("initial balance", wei_to_eth(i.initial_derc_supply) + " DERC");
        table_data += data_cell("balance", wei_to_eth(i.current_derc_supply) + " DERC");
        table_data += "</div><div class=\"columns-1\">";
        table_data += supply_button + cancel_button;
        table_data += "</div>";
        break;
      }
      case 1: {
        table_data += "<div class=\"columns-2\">";
        table_data += name_cell(zero_pad(i.id, 6));
        table_data += data_cell("state", "supplied");
        table_data += data_cell("mode", i.academy_mode);
        table_data += data_cell("owner", abbreviate_address(i.horse_owner));
        table_data += data_cell("horse", i.horse_id);
        table_data += data_cell("allowed length", unix_time_to_duration(i.tenure_length));
        table_data += data_cell("initial balance", wei_to_eth(i.initial_derc_supply) + " DERC");
        table_data += data_cell("balance", wei_to_eth(i.current_derc_supply) + " DERC");
        table_data += "</div><div class=\"columns-1\">";
        table_data += activate_button + deposit_button + withdraw_button + change_mode_button + cancel_button;
        table_data += "</div>";
        break;
      }
      case 2: {
        table_data += "<div class=\"columns-2\">";
        table_data += name_cell(zero_pad(i.id, 6));
        table_data += data_cell("state", "active");
        table_data += data_cell("mode", i.academy_mode);
        table_data += data_cell("owner", abbreviate_address(i.horse_owner));
        table_data += data_cell("horse", i.horse_id);
        table_data += data_cell("start time", unix_time_to_timestamp(i.start_time));
        table_data += data_cell("allowed length", unix_time_to_duration(i.tenure_length));
        table_data += data_cell("initial balance", wei_to_eth(i.initial_derc_supply) + " DERC");
        table_data += data_cell("balance", wei_to_eth(i.current_derc_supply) + " DERC");
        table_data += "</div><div class=\"columns-1\">";
        table_data += pause_button + deposit_button + withdraw_button + change_mode_button + cancel_button;
        table_data += "</div>";
        break;
      }
      case 3: {
        table_data += "<div class=\"columns-2\">";
        table_data += name_cell(zero_pad(i.id, 6));
        table_data += data_cell("state", "paused");
        table_data += data_cell("mode", i.academy_mode);
        table_data += data_cell("owner", abbreviate_address(i.horse_owner));
        table_data += data_cell("horse", i.horse_id);
        table_data += data_cell("start time", unix_time_to_timestamp(i.start_time));
        table_data += data_cell("allowed length", unix_time_to_duration(i.tenure_length));
        table_data += data_cell("initial balance", wei_to_eth(i.initial_derc_supply) + " DERC");
        table_data += data_cell("balance", wei_to_eth(i.current_derc_supply) + " DERC");
        table_data += "</div><div class=\"columns-1\">";
        table_data += unpause_button + deposit_button + withdraw_button + change_mode_button + cancel_button;
        table_data += "</div>";
        break;
      }
      case 4: {
        table_data += "<div class=\"columns-2\">";
        table_data += name_cell(zero_pad(i.id, 6));
        table_data += data_cell("state", "paused");
        table_data += data_cell("mode", i.academy_mode);
        table_data += data_cell("owner", abbreviate_address(i.horse_owner));
        table_data += data_cell("horse", i.horse_id);
        if (i.start_time > 0) {
          table_data += data_cell("start time", unix_time_to_timestamp(i.start_time));
        } else {
          table_data += data_cell("start time", "never");
        }
        table_data += data_cell("allowed length", unix_time_to_duration(i.tenure_length));
        table_data += data_cell("initial balance", wei_to_eth(i.initial_derc_supply) + " DERC");
        table_data += data_cell("balance", wei_to_eth(i.current_derc_supply) + " DERC");
        table_data += "</div><div class=\"columns-1\">";
        table_data += withdraw_button;
        table_data += "</div>";
        break;
      }
    }
    table_data += `</div>`;

    // table_data += "";
  }

  static_content.admin_table.innerHTML = table_data;
}

async function build_standard_dashboard() {
  static_content.standard_table.innerHTML = "<tr><th>loading tenure data</th><tr>";

  let index;
  
  tenures = await fetch_all_tenures();
  let user_tenures: any = [];
  for (index = 0; index < tenures.length; index++) {
    if (tenures[index].horse_owner.toLowerCase() == Moralis.User.current().get("ethAddress")) {
      user_tenures.push(tenures[index]);
    }
  }

  let table_data = "<tr><th>ID</th><th>state</th><th>mode</th><th>owner</th><th>horse ID</th><th>start time</th><th>approved length</th><th>initial balance</th><th>current balance</th><th>actions</th></tr>";

  const separator = "</td><td>"

  for (index = user_tenures.length - 1; index >= 0; index--) {
    const i = user_tenures[index];
    const cancel_button = `<button class="btn btn__action" onclick="javascript:cancel_prompt(${i.id})">cancel</button>`;
    const supply_button = `<button class="btn btn__action" onclick="javascript:supply_prompt(${i.id})">supply</button>`;

    switch (i.state) {
      case 0: {
        table_data += "<tr><td>" + i.id + separator;
        table_data += "initialized" + separator;
        table_data += i.academy_mode + separator;
        table_data += abbreviate_address(i.horse_owner) + separator;
        table_data += separator + separator + unix_time_to_duration(i.tenure_length) + separator;
        table_data += wei_to_eth(i.initial_derc_supply) + " DERC" + separator;
        table_data += wei_to_eth(i.current_derc_supply) + " DERC" + separator;
        table_data += supply_button + cancel_button;
        break;
      }
      case 1: {
        table_data += "<tr><td>" + i.id + separator;
        table_data += "supplied" + separator;
        table_data += i.academy_mode + separator;
        table_data += abbreviate_address(i.horse_owner) + separator;
        table_data += i.horse_id + separator;
        table_data += separator + unix_time_to_duration(i.tenure_length) + separator;
        table_data += wei_to_eth(i.initial_derc_supply) + " DERC" + separator;
        table_data += wei_to_eth(i.current_derc_supply) + " DERC" + separator;
        table_data += cancel_button;
        break;
      }
      case 2: {
        table_data += "<tr><td>" + i.id + separator;
        table_data += "active" + separator;
        table_data += i.academy_mode + separator;
        table_data += abbreviate_address(i.horse_owner) + separator;
        table_data += i.horse_id + separator;
        table_data += unix_time_to_timestamp(i.start_time) + separator;
        table_data += unix_time_to_duration(i.tenure_length) + separator;
        table_data += wei_to_eth(i.initial_derc_supply) + " DERC" + separator;
        table_data += wei_to_eth(i.current_derc_supply) + " DERC" + separator;
        table_data += cancel_button;
        break;
      }
      case 3: {
        table_data += "<tr><td>" + i.id + separator;
        table_data += "paused" + separator;
        table_data += i.academy_mode + separator;
        table_data += abbreviate_address(i.horse_owner) + separator;
        table_data += i.horse_id + separator;
        table_data += unix_time_to_timestamp(i.start_time) + separator;
        table_data += unix_time_to_duration(i.tenure_length) + separator;
        table_data += wei_to_eth(i.initial_derc_supply) + " DERC" + separator;
        table_data += wei_to_eth(i.current_derc_supply) + " DERC" + separator;
        table_data += cancel_button;
        break;
      }
      case 4: {
        table_data += "<tr><td>" + i.id + separator;
        table_data += "cancelled" + separator;
        table_data += i.academy_mode + separator;
        table_data += abbreviate_address(i.horse_owner) + separator;
        table_data += i.horse_id + separator;
        if (i.start_time > 0) {
          table_data += unix_time_to_timestamp(i.start_time) + separator;
        } else {
          table_data += "never" + separator;
        }
        table_data += unix_time_to_duration(i.tenure_length) + separator;
        table_data += wei_to_eth(i.initial_derc_supply) + " DERC" + separator;
        table_data += wei_to_eth(i.current_derc_supply) + " DERC" + separator;
        break;
      }
    }

    table_data += "</td></tr>";
  }

  static_content.standard_table.innerHTML = table_data;
}


async function cancel_prompt(id) {
  Swal.fire({
    title: 'Cancel Tenure',
    text: 'Are you sure you want to cancel tenure #' + String(id) + '? The horse asset will be returned to its owner.',
    showCancelButton: true,
    confirmButtonText: 'Yes, Cancel',
    cancelButtonText: 'No, Don\'t Cancel',
  }).then( async (result) => {
    if (result.isConfirmed) {
      Swal.fire({ title: 'please sign the transaction in your wallet', showConfirmButton: false });
      const transaction = await cancel_tenure(id);
      Swal.fire({ title: 'waiting for block confirmation...', showConfirmButton: false });
      await transaction.wait(CONFIRMATION_WAIT_COUNT);
      Swal.fire('cancelled tenure #' + String(id), '', 'success');
      await reload_dashboard();
    }
  })
}

async function supply_prompt(id) {
  let relevant_tenure;
  for (const tenure of tenures) {
    if (tenure.id == Number(id)) {
      relevant_tenure = tenure;
    }
  }
  if (!(relevant_tenure.horse_owner.toLowerCase() == Moralis.User.current().get("ethAddress"))) {
    Swal.fire('unauthorized', 'you are unauthorized to supply this tenure. the authorized address is ' + relevant_tenure.horse_owner + '.', 'error');
    return
  }

  Swal.fire({
    title: 'Supply Tenure',
    html: '<p>Click supply to supply this tenure with $DERC and a DeRace horse. If the tenure is cancelled for any reason, the horse will be returned to you in the same transaction.</p><input type="number" id="horse_id_input" class="swal2-input" placeholder="horse id">',
    showCancelButton: true,
    confirmButtonText: 'Supply',
    preConfirm: () => {
      const horse_id = Swal.getPopup().querySelector("#horse_id_input").value;
      if (!horse_id || Number(horse_id) < 0) {
        Swal.showValidationMessage('please enter valid a horse id');
      }
      return { horse_id: horse_id };
    }
  }).then( async (result) => {
    if (!result.isConfirmed) {
      return;
    }

    await Swal.fire({ title: 'notice', text: 'Supplying a tenure requires three transactions. The first approves the academy smart contract to transfer your $DERC, the second approves the academy smart contract to transfer your horse, and the third starts the transfer of both assets. The approval transactions don\'t move any assets, so if the supply operation is cancelled before the third transaction is completed, no changes are made. With that said, please sign all three transactions to supply the tenure.'});
    Swal.fire({ title: 'please sign transaction #1 in your wallet: $DERC approval', showConfirmButton: false });
    const derc_transaction = await approve_derc(ACADEMY_CONTRACT_ADDRESS, relevant_tenure.initial_derc_supply);
    Swal.fire({ title: 'waiting for block confirmation of transaction #1...', showConfirmButton: false });
    await derc_transaction.wait(CONFIRMATION_WAIT_COUNT);
    await Swal.fire({ title: 'approved $DERC', confirmButtonText: 'Next...', icon: 'success'});
    Swal.fire({ title: 'please sign transaction #2 in your wallet: horse approval (#' + String(result.value.horse_id) + ')', showConfirmButton: false });
    const horse_transaction = await approve_horse(ACADEMY_CONTRACT_ADDRESS, result.value.horse_id);
    Swal.fire({ title: 'waiting for block confirmation of transaction #2...', showConfirmButton: false });
    await horse_transaction.wait(CONFIRMATION_WAIT_COUNT);
    await Swal.fire({ title: 'approved horse', confirmButtonText: 'Next...', icon: 'success'});
    Swal.fire({ title: 'please sign transaction #3 in your wallet: asset transfer', showConfirmButton: false });
    const supply_transaction = await supply_tenure(id, result.value.horse_id);
    Swal.fire({ title: 'waiting for block confirmation of transaction #3...', showConfirmButton: false });
    await supply_transaction.wait(CONFIRMATION_WAIT_COUNT);
    Swal.fire({ title: 'supplied tenure', icon: 'success'});
    await reload_dashboard();
  })
}

async function activate_prompt(id) {
  Swal.fire({
    title: 'Activate Tenure',
    showCancelButton: true,
    confirmButtonText: 'Activate',
  }).then( async (result) => {
    if (result.isConfirmed) {
      Swal.fire({ title: 'please sign the transaction in your wallet', showConfirmButton: false });
      const transaction = await activate_tenure(id);
      Swal.fire({ title: 'waiting for block confirmation...', showConfirmButton: false });
      await transaction.wait(CONFIRMATION_WAIT_COUNT);
      Swal.fire('activated tenure #' + String(id), '', 'success');
      await reload_dashboard();
    }
  })
}

async function pause_prompt(id) {
  Swal.fire({
    title: 'Pause Tenure',
    showCancelButton: true,
    confirmButtonText: 'Pause',
  }).then( async (result) => {
    if (result.isConfirmed) {
      Swal.fire({ title: 'please sign the transaction in your wallet', showConfirmButton: false });
      const transaction = await set_paused_tenure(id, true);
      Swal.fire({ title: 'waiting for block confirmation...', showConfirmButton: false });
      await transaction.wait(CONFIRMATION_WAIT_COUNT);
      Swal.fire('paused tenure #' + String(id), '', 'success');
      await reload_dashboard();
    }
  })
}

async function unpause_prompt(id) {
  Swal.fire({
    title: 'Unpause Tenure',
    showCancelButton: true,
    confirmButtonText: 'Unpause',
  }).then( async (result) => {
    if (result.isConfirmed) {
      Swal.fire({ title: 'please sign the transaction in your wallet', showConfirmButton: false });
      const transaction = await set_paused_tenure(id, false);
      Swal.fire({ title: 'waiting for block confirmation...', showConfirmButton: false });
      await transaction.wait(CONFIRMATION_WAIT_COUNT);
      Swal.fire('unpaused tenure #' + String(id), '', 'success');
      await reload_dashboard();
    }
  })
}

async function deposit_prompt(id) {
  let relevant_tenure;
  for (const tenure of tenures) {
    if (tenure.id == Number(id)) {
      relevant_tenure = tenure;
    }
  }

  Swal.fire({
    title: 'Deposit to Tenure',
    html: '<input type="number" id="amount_input" class="swal2-input" placeholder="amount">',
    showCancelButton: true,
    confirmButtonText: 'Deposit',
    preConfirm: () => {
      const amount = Swal.getPopup().querySelector("#amount_input").value;
      if (!amount || Number(amount) < 0) {
        Swal.showValidationMessage('please enter a positive $DERC amount');
      }
      return { amount: amount };
    }
  }).then( async (result) => {
    if (!result.isConfirmed) {
      return;
    }

    await Swal.fire({ title: 'notice', text: 'Depositing to a tenure requires two transactions. The first approves the academy smart contract to transfer your $DERC, and the second starts the transfer. The approval transaction doesn\'t move any assets, so if the deposit operation is cancelled before the second transaction is completed, no changes are made. With that said, please sign both transactions to deposit to the tenure.'});
    Swal.fire({ title: 'please sign transaction #1 in your wallet: $DERC approval', showConfirmButton: false });
    const derc_transaction = await approve_derc(ACADEMY_CONTRACT_ADDRESS, BigInt(result.value.amount) * BigInt(10 ** 18));
    Swal.fire({ title: 'waiting for block confirmation of transaction #1...', showConfirmButton: false });
    await derc_transaction.wait(CONFIRMATION_WAIT_COUNT);
    await Swal.fire({ title: 'approved $DERC', confirmButtonText: 'Next...', icon: 'success'});
    Swal.fire({ title: 'please sign transaction #2 in your wallet: $DERC transfer', showConfirmButton: false });
    const supply_transaction = await deposit_to_tenure(id, BigInt(result.value.amount) * BigInt(10 ** 18));
    Swal.fire({ title: 'waiting for block confirmation of transaction #2...', showConfirmButton: false });
    await supply_transaction.wait(CONFIRMATION_WAIT_COUNT);
    Swal.fire({ title: 'deposited to tenure', icon: 'success'});
    await reload_dashboard();
  })
}

async function withdraw_prompt(id) {
  let relevant_tenure;
  for (const tenure of tenures) {
    if (tenure.id == Number(id)) {
      relevant_tenure = tenure;
    }
  }

  Swal.fire({
    title: 'Withdraw from Tenure',
    html: '<input type="text" id="to_address_input" class="swal2-input" placeholder="to address"><input type="number" id="amount_input" class="swal2-input" placeholder="amount">',
    showCancelButton: true,
    confirmButtonText: 'Withdraw',
    preConfirm: () => {
      const to_address = Swal.getPopup().querySelector("#to_address_input").value;
      const amount = Swal.getPopup().querySelector("#amount_input").value;
      if (!amount || Number(amount) < 0) {
        Swal.showValidationMessage('please enter a positive $DERC amount');
      }
      if (!to_address || !(Web3.utils.isAddress(to_address))) {
        Swal.showValidationMessage('please enter a valid destination address');
      }
      return { amount: amount, to_address: to_address };
    }
  }).then( async (result) => {
    if (!result.isConfirmed) {
      return;
    }

    Swal.fire({ title: 'please sign the transaction in your wallet', showConfirmButton: false });
    const transaction = await withdraw_from_tenure(id, result.value.to_address, BigInt(result.value.amount) * BigInt(10 ** 18));
    Swal.fire({ title: 'waiting for block confirmation...', showConfirmButton: false });
    await transaction.wait(CONFIRMATION_WAIT_COUNT);
    Swal.fire('withdrew ' + String(result.value.amount) + ' $DERC to ' + String(result.value.to_address), '', 'success');
    await reload_dashboard();
  })
}

async function change_mode_prompt(id) {
  let relevant_tenure;
  for (const tenure of tenures) {
    if (tenure.id == Number(id)) {
      relevant_tenure = tenure;
    }
  }

  Swal.fire({
    title: 'Change Tenure Mode',
    html: '<input type="number" id="mode_input" class="swal2-input" placeholder="new mode">',
    showCancelButton: true,
    confirmButtonText: 'Change Mode',
    preConfirm: () => {
      const mode = Swal.getPopup().querySelector("#mode_input").value;
      if (!mode || Number(mode) < 0) {
        Swal.showValidationMessage('please enter a valid academy mode');
      }
      return { mode: mode };
    }
  }).then( async (result) => {
    if (!result.isConfirmed) {
      return;
    }

    Swal.fire({ title: 'please sign the transaction in your wallet', showConfirmButton: false });
    const transaction = await change_tenure_mode(id, result.value.mode);
    Swal.fire({ title: 'waiting for block confirmation...', showConfirmButton: false });
    await transaction.wait(CONFIRMATION_WAIT_COUNT);
    Swal.fire('changed mode to ' + String(result.value.mode), '', 'success');
    await reload_dashboard();
  })
}

async function initialize_tenure(horse_owner, academy_mode, initial_derc_supply, length) {
  const initialize_tenure_parameters = {
    contractAddress: ACADEMY_CONTRACT_ADDRESS,
    functionName: "initialize_tenure",
    abi: ACADEMY_CONTRACT_ABI,
    params: {
      _horse_owner: horse_owner,
      _academy_mode: academy_mode,
      _initial_derc_supply: initial_derc_supply,
      _tenure_length: length
    }
  };

  return await Moralis.executeFunction(initialize_tenure_parameters);
}

async function cancel_tenure(id) {
  const cancel_tenure_parameters = {
    contractAddress: ACADEMY_CONTRACT_ADDRESS,
    functionName: "cancel_tenure",
    abi: ACADEMY_CONTRACT_ABI,
    params: {
      tenure_id: id
    }
  };

  return await Moralis.executeFunction(cancel_tenure_parameters);
}

async function supply_tenure(id, horse_id) {
  const supply_tenure_parameters = {
    contractAddress: ACADEMY_CONTRACT_ADDRESS,
    functionName: "supply_tenure",
    abi: ACADEMY_CONTRACT_ABI,
    params: {
      tenure_id: id,
      _horse_id: horse_id
    }
  };

  return await Moralis.executeFunction(supply_tenure_parameters);
}

async function activate_tenure(id) {
  const activate_tenure_parameters = {
    contractAddress: ACADEMY_CONTRACT_ADDRESS,
    functionName: "activate_tenure",
    abi: ACADEMY_CONTRACT_ABI,
    params: {
      tenure_id: id
    }
  };

  return await Moralis.executeFunction(activate_tenure_parameters);
}

async function set_paused_tenure(id, paused) {
  const set_paused_tenure_parameters = {
    contractAddress: ACADEMY_CONTRACT_ADDRESS,
    functionName: "set_tenure_paused",
    abi: ACADEMY_CONTRACT_ABI,
    params: {
      tenure_id: id,
      paused: paused
    }
  };

  return await Moralis.executeFunction(set_paused_tenure_parameters);
}

async function deposit_to_tenure(id, amount) {
  const deposit_to_tenure_parameters = {
    contractAddress: ACADEMY_CONTRACT_ADDRESS,
    functionName: "deposit_funds_to_tenure",
    abi: ACADEMY_CONTRACT_ABI,
    params: {
      tenure_id: id,
      amount: amount
    }
  };

  return await Moralis.executeFunction(deposit_to_tenure_parameters);
}

async function withdraw_from_tenure(id, to_address, amount) {
  const withdraw_from_tenure_parameters = {
    contractAddress: ACADEMY_CONTRACT_ADDRESS,
    functionName: "withdraw_funds_from_tenure",
    abi: ACADEMY_CONTRACT_ABI,
    params: {
      tenure_id: id,
      amount: amount,
      to_address: to_address
    }
  };

  return await Moralis.executeFunction(withdraw_from_tenure_parameters);
}

async function change_tenure_mode(id, mode) {
  const change_tenure_mode_parameters = {
    contractAddress: ACADEMY_CONTRACT_ADDRESS,
    functionName: "set_tenure_academy_mode",
    abi: ACADEMY_CONTRACT_ABI,
    params: {
      tenure_id: id,
      academy_mode: mode
    }
  };

  return await Moralis.executeFunction(change_tenure_mode_parameters);
}

async function approve_derc(address, amount) {
  const approve_derc_parameters = {
    contractAddress: DERC_CONTRACT_ADDRESS,
    functionName: "approve",
    abi: ERC20_CONTRACT_ABI,
    params: {
      _spender: address,
      _value: amount
    }
  };

  return await Moralis.executeFunction(approve_derc_parameters);
}

async function approve_horse(address, id) {
  const approve_horse_parameters = {
    contractAddress: HORSE_CONTRACT_ADDRESS,
    functionName: "approve",
    abi: ERC721_CONTRACT_ABI,
    params: {
      to: address,
      tokenId: id
    }
  };

  return await Moralis.executeFunction(approve_horse_parameters);
}

async function submit_form(event) {
  event.preventDefault();

  const inputs: any = static_content.form.childNodes;
  console.log(inputs);

  if (!(Web3.utils.isAddress(inputs[0].value))) {
    console.log(inputs[0].value);
    console.log(!(Web3.utils.isAddress(inputs[0].value)));
    Swal.fire("invalid owner address", "please enter a valid ethereum address", "error");
    return;
  }
  if (Number(inputs[1].value) < 0 || inputs[1].value == "") {
    Swal.fire("invalid academy mode", "please enter a valid academy mode", "error");
    return;
  }
  if (Number(inputs[2].value) <= 0 || inputs[2].value == "") {
    Swal.fire("invalid $DERC value", "please enter a positive $DERC value", "error");
    return;
  }
  if (Number(inputs[3].value) <= 0 || inputs[3].value == "" || Number.isInteger(inputs[3].value)) {
    Swal.fire("invalid length", "please enter a positive integer length", "error");
    return;
  }

  Swal.fire({ title: 'please sign the transaction in your wallet', showConfirmButton: false });
  const transaction = await initialize_tenure(inputs[0].value, inputs[1].value, BigInt(inputs[2].value) * BigInt(10 ** 18), inputs[3].value);
  Swal.fire({ title: 'waiting for block confirmation...', showConfirmButton: false });
  await transaction.wait(CONFIRMATION_WAIT_COUNT);
  Swal.fire('initialized tenure', '', 'success');
  await reload_dashboard();
}

async function isLoggedIn(user): Promise<Boolean> {
  return (user);
}

async function isAdmin(user): Promise<Boolean> {
  const get_owner_parameters = {
    contractAddress: ACADEMY_CONTRACT_ADDRESS,
    functionName: "owner",
    abi: ACADEMY_CONTRACT_ABI,
    parameters: {}
  };

  const message = await Moralis.executeFunction(get_owner_parameters);

  return String(message).toLowerCase() === String(user.get("ethAddress").toLowerCase());
}

async function authenticate() {
  await Moralis.authenticate({
    signingMessage: "SMR Academy Login",
  });
}

function isNumber(n){
    return Number(n)=== n;
}

function abbreviate_address(address) {
  return address.substring(0,6) + "..." + address.substring(address.length-4, address.length);
}

function wei_to_eth(input) {
  return input / (10 ** 18);
}

function unix_time_to_duration(input) {
  let value = 0;
  let unit = "";

  if (input < 60) {
    value = input;
    unit = "second";
  } else if (input < 3600) {
    value = Math.floor(input/60);
    unit = "minute";
  } else if (input < (3600 * 24)) {
    value = Math.floor(input/3600);
    unit = "hour";
  } else if (input < (3600 * 24 * 7)) {
    value = Math.floor(input/(3600*24));
    unit = "day";
  } else if (input < (3600 * 24 * 30)) {
    value = Math.floor(input/(3600*24*7));
    unit = "week"
  } else if (input < (3600 * 24 * 365)) {
    value = Math.floor(input/(3600*24*30));
    unit = "month";
  } else {
    value = Math.floor(input/(3600*24*365));
    unit = "year"
  }

  if (value > 1) {
    unit += "s";
  }

  return String(value) + " " + unit;
}

function unix_time_to_timestamp(input) {
  var d = new Date(input * 1000);
  // return d.getDate() + '/' + (d.getMonth()) + '/' + d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes();
  return d.toLocaleTimeString("en-US") + " " + d.toLocaleDateString("en-US")
}

//    TESTNET:
//  academy: 0x71C6EC2058175480b035d69D963C268E4CdF7614
//  derace: 0x7c8Ac19130613DDE3340E8c1C759560cb929127b
//  derc: 0xDc8206875973204a6E5e835009EBE742840Bda3D
//  horse: 0xD4d15fAC1a5dea3468803e3dD0420B79a7E7499E

//    MAINNET:
//  academy: 0x3930f79b70aD5BC4605ac2db04872BE9D79c6ce4
//  derace: 0x09C9Ed926440b43581478c8faD6873aE54483FAa
//  derc: 0xb35fcbcf1fd489fce02ee146599e893fdcdc60e6
//  horse: 0x9d77cb4D8371736e2A2b2bfAa677b7841cDc8fC1