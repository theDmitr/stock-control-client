export interface StockHolderInfoDto {
    stockHolderId: string;
    stockHolderName: string;
    stockHolderImage: string;
    stockRecordsQuantity: number;
    stockRecords: ProductStockRecordResponseDto[];
}

export interface ProductStockRecordResponseDto {
    stockHolderId: string;
    productId: string;
    name: string;
    image: string;
    quantity: number;
}