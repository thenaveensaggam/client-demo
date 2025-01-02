export interface CartResponseView {
    _id?: string;
    products: ProductsEntity[],
    total: string;
    tax: string;
    grandTotal: string;
    userObj: UserObj;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface ProductsEntity {
    categoryObj: CategoryObj;
    subCategoryObj: SubCategoryObj;
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    brand: string;
    price: string;
    quantity: string;
    count: number;
    sold: number;
}

export interface CategoryObj {
    _id: string;
    name: string;
    description: string;
    subCategories?: (string)[] | null;
    createdAt: string;
    updatedAt: string;
}

export interface SubCategoryObj {
    _id: string;
    name: string;
    description: string;
}

export interface UserObj {
    _id: string;
    username: string;
    email: string;
    password: string;
    imageUrl: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
