export type Dormitory = {
  name: string,
  mdurl: string,
  key: string,
}

export const Wakabishi1: Dormitory = {
  name: '第一若菱寮',
  mdurl: 'https://www.m-dmeal.com/S-itami008-JYBFE_jpahbXmFsh4m396APWmYEFDN-E/login.aspx?p=mdmealITM008',
  key: 'wakabishi1',
}

export const Wakabishi2: Dormitory = {
  name: '第二若菱寮',
  mdurl: 'https://www.m-dmeal.com/S-itami013-GwWVCsTujjKUXs9u2UcX_FMCx5MjMj-E/login.aspx?p=mdmealITM013',
  key: 'wakabishi2',
}

export const RiverHills: Dormitory = {
  name: 'リバーヒルズ寮',
  mdurl: 'https://www.m-dmeal.com/S-itami004-PFPLfD-LMgAARQR5ZMyGJT7hmikZHU-E/login.aspx?p=mdmealITM004',
  key: 'riverhills',
}

export const Taihei: Dormitory = {
  name: '太平寮',
  mdurl: 'https://www.m-dmeal.com/S-itami005-SJJbPfBxCBz3k3gMkFuNCX6FDG6nYW-E/login.aspx?p=mdmealITM005',
  key: 'taihei',
}

export const Dormitories = [
  Wakabishi1, Wakabishi2, RiverHills, Taihei
]