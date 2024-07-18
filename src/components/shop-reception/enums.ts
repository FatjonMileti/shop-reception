export enum PermissionRoles {
  GG_RO_HQ_SHOP_RECEPTION_DIRECTOR = 'GG_RO_HQ_SHOP_RECEPTION_DIRECTOR',
  GG_RO_HQ_SHOP_RECEPTION_STORE = 'GG_RO_HQ_SHOP_RECEPTION_STORE',
  GG_RO_HQ_SHOP_RECEPTION_BACKOFFICE = 'GG_RO_HQ_SHOP_RECEPTION_BACKOFFICE',
  GG_RO_HQ_SHOP_RECEPTION_ADMIN = 'GG_RO_HQ_SHOP_RECEPTION_ADMIN'
}

export enum Mark {
  VEGETABLES_FRUITS = 'Legume fructe',
  DAMAGED = 'Deteriorate',
  SHORT_TERM = 'Termen Scurt',
  EXPIRED = 'Expirate',
  VEGETABLE_FRUIT_QUALITY = 'Calitate legume fructe',
  DETERIORATION_A = 'Deteriorare-A',
  QUANTITATIVE_DIFFERENCE_A = 'Diferenta cantitativa-A',
  MISSING_BAX = 'Lipsa Bax',
  QUANTITATIVE_DIFFERENCE = 'Diferenta cantitativa',
  MISSING_CARRIER = 'Lipsa transportator',
  PALLETS_MERCHANDISE_MISSING = 'Paleti marfa lipsa',
  VOLUME = 'VOL'
}

export enum DefectReason {
  PROVIDER = 'Prestator',
  TRANSPORTER = 'Transportator',
  SHOP = 'Magazin'
}

export enum ScanStatus {
  CODE_AND_EAN_NOT_PRESENT = 'CODE_AND_EAN_NOT_PRESENT',
  EAN_NOT_PRESENT = 'EAN_NOT_PRESENT'
}
