export interface CardData {
  id: number;
  text: string;
  category: 'רגש' | 'ראש' | 'פיזיות';
  color: string;
}

export const cards: CardData[] = [
  {
    id: 1,
    text: "מה היה קשה לי בינינו בימים האלה?",
    category: 'רגש',
    color: 'bg-cyan-50'
  },
  {
    id: 2,
    text: "מתי הרגשתי בודד/ה במיוחד גם כשלא הייתי לבד?",
    category: 'רגש',
    color: 'bg-cyan-50'
  },
  {
    id: 3,
    text: "מה חשוב לי לזכור מהתקופה הזו לרגעים משבר בעתיד?",
    category: 'ראש',
    color: 'bg-orange-50'
  },
  {
    id: 4,
    text: "מה אני הכי צריך/ה עכשיו?",
    category: 'רגש',
    color: 'bg-cyan-50'
  },
  {
    id: 5,
    text: "מה היה הרגע שהכי הפחיד אותי?",
    category: 'רגש',
    color: 'bg-cyan-50'
  },
  {
    id: 6,
    text: "מה למדתי על עצמי שלא ידעתי קודם?",
    category: 'ראש',
    color: 'bg-orange-50'
  },
  {
    id: 7,
    text: "מה עזר לי לעבור את התקופה הזו?",
    category: 'ראש',
    color: 'bg-orange-50'
  },
  {
    id: 8,
    text: "איזו תמיכה שקיבלתי הכי ריגשה אותי?",
    category: 'רגש',
    color: 'bg-cyan-50'
  },
  {
    id: 9,
    text: "איזה סוג של קרבה או מגע הכי תמך בי בתקופה הזו?",
    category: 'פיזיות',
    color: 'bg-rose-50'
  },
  {
    id: 10,
    text: "איזה רגע גרם לי להרגיש הכי חי/ה בתוך הכאוס?",
    category: 'ראש',
    color: 'bg-orange-50'
  }
];
