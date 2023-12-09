interface Telephone {
  DDD: string;
  number: string;
}

interface User {
  user_id: string;
  name: string;
  cpf: string;
  email: string;
  date_of_birth: Date;
  telephone: Telephone;
}

interface Contact {
  type: string;
}

interface Options {
  name: string;
  icon: string;
  contact_options: Contact;
}

interface RealtorSocials {
  contact_info: string;
  socials_options: Options;
}

interface RealtorLocation {
  latitude: number;
  longitude: number;
}

interface RegionsUsed {
  region: string;
}

interface RealtorRegions {
  regions_used: RegionsUsed;
}

export interface RealtorType {
  real_id: string;
  creci: string;
  is_online: boolean;
  description: string;
  user: User;
  socials_realtor: RealtorSocials[];
  realtor_location: RealtorLocation;
  realtor_regions: RealtorRegions[];
}
