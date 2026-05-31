// ISO countries with flag emoji + dial code. Sorted alphabetically by name.
export type Country = { code: string; name: string; dial: string; flag: string };

const flag = (cc: string) =>
  cc.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

const raw: [string, string, string][] = [
  ["AF","Afghanistan","93"],["AL","Albania","355"],["DZ","Algeria","213"],["AS","American Samoa","1684"],
  ["AD","Andorra","376"],["AO","Angola","244"],["AI","Anguilla","1264"],["AG","Antigua and Barbuda","1268"],
  ["AR","Argentina","54"],["AM","Armenia","374"],["AW","Aruba","297"],["AU","Australia","61"],
  ["AT","Austria","43"],["AZ","Azerbaijan","994"],["BS","Bahamas","1242"],["BH","Bahrain","973"],
  ["BD","Bangladesh","880"],["BB","Barbados","1246"],["BY","Belarus","375"],["BE","Belgium","32"],
  ["BZ","Belize","501"],["BJ","Benin","229"],["BM","Bermuda","1441"],["BT","Bhutan","975"],
  ["BO","Bolivia","591"],["BA","Bosnia and Herzegovina","387"],["BW","Botswana","267"],["BR","Brazil","55"],
  ["IO","British Indian Ocean Territory","246"],["VG","British Virgin Islands","1284"],["BN","Brunei","673"],
  ["BG","Bulgaria","359"],["BF","Burkina Faso","226"],["BI","Burundi","257"],["KH","Cambodia","855"],
  ["CM","Cameroon","237"],["CA","Canada","1"],["CV","Cape Verde","238"],["KY","Cayman Islands","1345"],
  ["CF","Central African Republic","236"],["TD","Chad","235"],["CL","Chile","56"],["CN","China","86"],
  ["CX","Christmas Island","61"],["CC","Cocos Islands","61"],["CO","Colombia","57"],["KM","Comoros","269"],
  ["CK","Cook Islands","682"],["CR","Costa Rica","506"],["HR","Croatia","385"],["CU","Cuba","53"],
  ["CW","Curacao","599"],["CY","Cyprus","357"],["CZ","Czech Republic","420"],["CD","DR Congo","243"],
  ["DK","Denmark","45"],["DJ","Djibouti","253"],["DM","Dominica","1767"],["DO","Dominican Republic","1809"],
  ["EC","Ecuador","593"],["EG","Egypt","20"],["SV","El Salvador","503"],["GQ","Equatorial Guinea","240"],
  ["ER","Eritrea","291"],["EE","Estonia","372"],["ET","Ethiopia","251"],["FK","Falkland Islands","500"],
  ["FO","Faroe Islands","298"],["FJ","Fiji","679"],["FI","Finland","358"],["FR","France","33"],
  ["PF","French Polynesia","689"],["GA","Gabon","241"],["GM","Gambia","220"],["GE","Georgia","995"],
  ["DE","Germany","49"],["GH","Ghana","233"],["GI","Gibraltar","350"],["GR","Greece","30"],
  ["GL","Greenland","299"],["GD","Grenada","1473"],["GU","Guam","1671"],["GT","Guatemala","502"],
  ["GG","Guernsey","44"],["GN","Guinea","224"],["GW","Guinea-Bissau","245"],["GY","Guyana","592"],
  ["HT","Haiti","509"],["HN","Honduras","504"],["HK","Hong Kong","852"],["HU","Hungary","36"],
  ["IS","Iceland","354"],["IN","India","91"],["ID","Indonesia","62"],["IR","Iran","98"],
  ["IQ","Iraq","964"],["IE","Ireland","353"],["IM","Isle of Man","44"],["IL","Israel","972"],
  ["IT","Italy","39"],["CI","Ivory Coast","225"],["JM","Jamaica","1876"],["JP","Japan","81"],
  ["JE","Jersey","44"],["JO","Jordan","962"],["KZ","Kazakhstan","7"],["KE","Kenya","254"],
  ["KI","Kiribati","686"],["XK","Kosovo","383"],["KW","Kuwait","965"],["KG","Kyrgyzstan","996"],
  ["LA","Laos","856"],["LV","Latvia","371"],["LB","Lebanon","961"],["LS","Lesotho","266"],
  ["LR","Liberia","231"],["LY","Libya","218"],["LI","Liechtenstein","423"],["LT","Lithuania","370"],
  ["LU","Luxembourg","352"],["MO","Macau","853"],["MK","Macedonia","389"],["MG","Madagascar","261"],
  ["MW","Malawi","265"],["MY","Malaysia","60"],["MV","Maldives","960"],["ML","Mali","223"],
  ["MT","Malta","356"],["MH","Marshall Islands","692"],["MR","Mauritania","222"],["MU","Mauritius","230"],
  ["YT","Mayotte","262"],["MX","Mexico","52"],["FM","Micronesia","691"],["MD","Moldova","373"],
  ["MC","Monaco","377"],["MN","Mongolia","976"],["ME","Montenegro","382"],["MS","Montserrat","1664"],
  ["MA","Morocco","212"],["MZ","Mozambique","258"],["MM","Myanmar","95"],["NA","Namibia","264"],
  ["NR","Nauru","674"],["NP","Nepal","977"],["NL","Netherlands","31"],["NC","New Caledonia","687"],
  ["NZ","New Zealand","64"],["NI","Nicaragua","505"],["NE","Niger","227"],["NG","Nigeria","234"],
  ["NU","Niue","683"],["KP","North Korea","850"],["NO","Norway","47"],["OM","Oman","968"],
  ["PK","Pakistan","92"],["PW","Palau","680"],["PS","Palestine","970"],["PA","Panama","507"],
  ["PG","Papua New Guinea","675"],["PY","Paraguay","595"],["PE","Peru","51"],["PH","Philippines","63"],
  ["PL","Poland","48"],["PT","Portugal","351"],["PR","Puerto Rico","1787"],["QA","Qatar","974"],
  ["CG","Republic of the Congo","242"],["RE","Reunion","262"],["RO","Romania","40"],["RU","Russia","7"],
  ["RW","Rwanda","250"],["BL","Saint Barthelemy","590"],["SH","Saint Helena","290"],["KN","Saint Kitts and Nevis","1869"],
  ["LC","Saint Lucia","1758"],["MF","Saint Martin","590"],["PM","Saint Pierre and Miquelon","508"],
  ["VC","Saint Vincent and the Grenadines","1784"],["WS","Samoa","685"],["SM","San Marino","378"],
  ["ST","Sao Tome and Principe","239"],["SA","Saudi Arabia","966"],["SN","Senegal","221"],["RS","Serbia","381"],
  ["SC","Seychelles","248"],["SL","Sierra Leone","232"],["SG","Singapore","65"],["SX","Sint Maarten","1721"],
  ["SK","Slovakia","421"],["SI","Slovenia","386"],["SB","Solomon Islands","677"],["SO","Somalia","252"],
  ["ZA","South Africa","27"],["KR","South Korea","82"],["SS","South Sudan","211"],["ES","Spain","34"],
  ["LK","Sri Lanka","94"],["SD","Sudan","249"],["SR","Suriname","597"],["SZ","Swaziland","268"],
  ["SE","Sweden","46"],["CH","Switzerland","41"],["SY","Syria","963"],["TW","Taiwan","886"],
  ["TJ","Tajikistan","992"],["TZ","Tanzania","255"],["TH","Thailand","66"],["TL","Timor-Leste","670"],
  ["TG","Togo","228"],["TK","Tokelau","690"],["TO","Tonga","676"],["TT","Trinidad and Tobago","1868"],
  ["TN","Tunisia","216"],["TR","Turkey","90"],["TM","Turkmenistan","993"],["TC","Turks and Caicos","1649"],
  ["TV","Tuvalu","688"],["VI","U.S. Virgin Islands","1340"],["UG","Uganda","256"],["UA","Ukraine","380"],
  ["AE","United Arab Emirates","971"],["GB","United Kingdom","44"],["US","United States","1"],
  ["UY","Uruguay","598"],["UZ","Uzbekistan","998"],["VU","Vanuatu","678"],["VA","Vatican","39"],
  ["VE","Venezuela","58"],["VN","Vietnam","84"],["WF","Wallis and Futuna","681"],["YE","Yemen","967"],
  ["ZM","Zambia","260"],["ZW","Zimbabwe","263"],
];

export const COUNTRIES: Country[] = raw
  .map(([code, name, dial]) => ({ code, name, dial, flag: flag(code) }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const DEFAULT_COUNTRY: Country =
  COUNTRIES.find((c) => c.code === "AE")!;

// National number length ranges (subscriber digits, excluding country code, leading 0 stripped).
// Conservative ranges based on ITU + common-usage; covers virtually all valid numbers.
const RANGES: Record<string, [number, number]> = {
  AE: [8, 9], SA: [8, 9], QA: [7, 8], KW: [7, 8], BH: [7, 8], OM: [7, 8],
  US: [10, 10], CA: [10, 10], GB: [9, 10], IN: [10, 10], CN: [11, 11],
  AU: [9, 9], DE: [6, 11], FR: [9, 9], IT: [9, 11], ES: [9, 9], NL: [9, 9],
  BE: [8, 9], CH: [9, 9], AT: [4, 13], SE: [7, 13], NO: [8, 8], DK: [8, 8],
  FI: [5, 12], IE: [7, 11], PT: [9, 9], PL: [9, 9], RU: [10, 10], TR: [10, 10],
  EG: [9, 10], ZA: [9, 9], NG: [10, 10], KE: [9, 10], JP: [9, 10], KR: [9, 10],
  ID: [9, 11], PH: [10, 10], TH: [9, 9], VN: [9, 10], PK: [10, 10], BD: [10, 10],
  BR: [10, 11], MX: [10, 10], AR: [10, 11],
};

export const normalizeLocal = (raw: string): string => {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  while (digits.startsWith("0")) digits = digits.slice(1);
  return digits;
};

export const toE164 = (country: Country, local: string): string => {
  return `+${country.dial}${normalizeLocal(local)}`;
};

export const validatePhone = (country: Country, local: string): string | null => {
  const n = normalizeLocal(local);
  if (!n) return "Enter your phone number";
  const [min, max] = RANGES[country.code] ?? [6, 14];
  if (n.length < min) return `Number too short for ${country.name}`;
  if (n.length > max) return `Number too long for ${country.name}`;
  return null;
};
