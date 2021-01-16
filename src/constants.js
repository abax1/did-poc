export const REL_VERSION = "v0.0.1-alpha"
export const nodeType = "CAR_PARK"
//export const nodeType = process.env.REACT_APP_NODE_TYPE
//export const nodeName = process.env.REACT_APP_NODE_TYPE
export const nodeName = "BIOLEDGER"
//export const nodeName = "EVERGREEN"

export const counterParty = nodeName === "BIOLEDGER" ? "evergreen" : "bioledger"

export const COLLECTOR = "COLLECTOR"
export const TRADER = "TRADER"

export const traderType = nodeName === "BIOLEDGER" ? COLLECTOR : TRADER

export const oilType = [
  "UCO",
  "UCO_VEG"
]

export const ghgType = [
  "0",
  "1"
]

export const certType = [
  "ISCC",
  "CERT2"
]

export const driverList = [
  "DR001",
  "DR002",
  "DR003",
  "DR004",
  "DR005",
  "DR006",
  "DR007",
  "DR008",
  "DR009",
  "DR010"
]


export const restaurantList = [
  "RT001",
  "RT002",
  "RT003",
  "RT004",
  "RT005",
  "RT006",
  "RT007",
  "RT008",
  "RT009",
  "RT010"
]

export const jobIdList = [
  "JW001",
  "JW002",
  "JW003",
  "JW004",
  "JW005",
  "JW006",
  "JW007",
  "JW008",
  "JW009",
  "JW010"
]

export const driverLat = "53.3498"
export const driverLong = "-6.2603"


export const nodeApi = nodeType === "CAR_PARK"? "http://localhost:10050" : "http://localhost:10051"
//export const nodeApi = nodeType === "CAR_PARK"? "https://gbrvf-api.bce-engine.net" : "https://deo2-api.bce-engine.net"

export const blockchainApi = "https://yti3nrx1oyoxqxc-db202003021559.adb.uk-london-1.oraclecloudapps.com/ords/bioledger"

export const bioApiBaseUrl = nodeName === "BIOLEDGER" 
? "https://7906666FDEF147659ED34D536C0C9FAA.blockchain.ocp.oraclecloud.com:443"
: "https://7C86A4924211445FB850538E6B131A17.blockchain.ocp.oraclecloud.com:443"

export const bioApi = `${bioApiBaseUrl}/restproxy1/bcsgw/rest/v1`

//export const authParams = "Basic cGF0cmlja0BiaW8tbGVkZ2VyLmNvbTpCaW9mdWVsMTAxISE="
//export const authParams = "Basic cGF0cmlja0BiaW8tbGVkZ2VyLmNvbTpCaW9mdWVsMTAzISE="
//export const authParams = "Basic patrick@bio-ledger.com:Biofuel103!!"
//export const authParams = "Basic cGF0cmlja0BiaW8tbGVkZ2VyLmNvbTpCaW9mdWVsMTA1ISE="
export const authParams = `Basic ${process.env.REACT_APP_PASSWORD}`



export const etlApi = "http://localhost:5001"
//export const etlApi = "https://gbrvf-etl-api.bce-engine.net"

export const MOBILE_WIDTH = 768;

export const API_KEY = "andy-api-key"

export const MIN_RECONCILIATION_HOURS = 0
export const MAX_RECONCILIATION_HOURS = 1460

export const TADIGS = [
    { code: "GBRVF", country: "UK", x500: "OU=GBRVF, O=Vodafone, L=London, C=GB" },
    { code: "GBRO2", country: "UK", x500: "OU=GBRVF, O=Vodafone, L=London, C=GB" },
    { code: "AAZVF", country: "UK", x500: "OU=GBRVF, O=Vodafone, L=London, C=GB" },
    { code: "DEO2", country: "DE", x500: "OU=DEO2, O=OTWO, L=Frankfurt, C=DE" }
  ]

export const TIMEZONE = "Europe/London"
//console.log("ENV", process.env)

export const CURRENCY_CODES = [
  "EUR",
  "USD",
  "GBR"
]

export const NETWORK_LIST = require('./network_list.json')
