export interface RegisterAndLoginType {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface SkillsType {
  _id: string;
  name: string;
  percent: number;
}

export interface ExperienceType {
  _id: string;
  workName: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface EducationType {
  _id: string;
  name: string;
  level: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface PhotoType {
  _id: string;
  name: string;
  // Add other properties related to photos if needed
}

export interface PortfolioType {
  _id: string;
  name: string;
  url: string;
  description: string;
  photo: PhotoType;
}

export interface AccountValuesType {
  currentPassword: number,
    newPassword: number
}
