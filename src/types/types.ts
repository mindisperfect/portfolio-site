export interface RegisterAndLoginType {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export interface SkillsType {
    _id: string
    name: string;
percent: number;
length: number
}

export interface ExperienceType {
    _id: string;
    workName: string;
    companyName: string;
    description: string;
    startDate: string;
    endDate: string;
}