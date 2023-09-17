type SponsorLevelType =
  | 'Gold'
  | 'Silver'
  | 'Platinum'
  | 'Georgia O\' Keeffe'
  | 'Arthur Miller'
  | 'Gustav Mahler'
  | 'Martha Graham';

export interface NewSponsorForm {
  honeypot?: string;
  LogoUrl: string;
  OrganizationWebsiteAddress: string;
  SponsorLevel: SponsorLevelType | '';
  SponsorOrganization: string;
}

export interface CloudinaryUploadResult {
  info: {
    secure_url: string;
  }
}
