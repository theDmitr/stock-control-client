export class Category {
    id: string = '';
    name: string = '';
    description: string = '';
    parentCategoryId: string = '';
    productsCount: number = 0;
    imageSrc: string = '';
}

export interface CategoryShort {
    id: string;
    name: string;
}