import {CategoryShort} from "../category/category";
import {MakerShort} from "../maker/maker";
import {ProductFeatureDisplay} from "../feature/feature";

export interface ProductInfo {
    id: string;
    name: string;
    price: number;
    description: string;
    category: CategoryShort;
    maker: MakerShort;
    images: string[];
    features: ProductFeatureDisplay[];
}