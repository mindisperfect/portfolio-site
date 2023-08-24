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
  currentPassword: number;
  newPassword: number;
}

export interface PersonalInfoType {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  info: string;
  phoneNumber: string;
  birthday: string;
  address: string;
  email: string;
  github: string;
  telegram: string;
}

interface UserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface MessagesType {
  _id: string;
  title: string;
  message: string;
  whom: UserInfo;
  user: string
} 

export interface InfosType {
    firstName: string;
  lastName: string;
  username: string;
  info: string;
  phoneNumber: string;
  birthday: string;
  address: string;
  email: string;
  github: string;
  telegram: string;
  _id: string;
}
