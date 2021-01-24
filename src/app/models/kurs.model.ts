export interface Kurs {
    id: number;
    autorId: number;
    kategorijaId: number;
    ime: string;
    opis: string;
    datumPoslednjePromene: string;
    jezik: string;
    cena: number;
    slika: string;
    javan: boolean;
}