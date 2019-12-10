export interface Items{
    _id: string;
    category: number;
    name: string;
    pic_link: string;
    price: {
        avg_price: number;
        seven: number;
        bigc: number;
        tesco: number;
        tops: number;
    }
}