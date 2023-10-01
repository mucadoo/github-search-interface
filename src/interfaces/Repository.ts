import Language from "./Language";

export interface Repository {
    url: string;
    name: string;
    description: string;
    rating: number;
    stargazerCount: number;
    forkCount: number;
    primaryLanguage: Language;
}