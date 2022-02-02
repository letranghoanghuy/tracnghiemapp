export default class Subject {
    key?: string | null;
    name?: string;
    code?: string;
    questions?: Question[];
}

export class Question{
    key?: string | null;
    question?: string;
    answers?: string[];
    correctAnswer?: number;
}