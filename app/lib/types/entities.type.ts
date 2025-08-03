// ---------- Enums ----------
export type UserRole = 'admin' | 'manager' | 'seller';
export type PurchaseOrderStatus = 'pending' | 'approved' | 'cancelled' | 'completed';

// User Entity
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export type UserRelations = {
  PurchaseOrder: PurchaseOrder[];
  StockMovement: StockMovement[];
  ProductPriceHistory: ProductPriceHistory[];
};

export type UserFull = User & UserRelations;
export type UserWithCount = UserFull & {
  _count: {
    PurchaseOrder: number;
    StockMovement: number;
    ProductPriceHistory: number;
  };
};


// wareHouse Entity
export type WareHouse = {
  id: string;
  name: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export type WareHouseRelations = {
  InventoryLevel: InventoryLevel[];
  fromStockMovement: StockMovement[];
  toStockMovement: StockMovement[];
};

export type WareHouseFull = WareHouse & WareHouseRelations;
export type WareHouseWithCount = WareHouseFull & {
    _count: {
        InventoryLevel: number;
        fromStockMovement: number;
        toStockMovement: number;
    }
}


// Supplier Entity
export type Supplier = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export type SupplierRelations = {
  Product: Product[];
  PurchaseOrder: PurchaseOrder[];
};

export type SupplierFull = Supplier & SupplierRelations;
export type SupplierWithCount = SupplierFull & {
    _count: {
        Product: number;
        PurchaseOrder: number;
    }
}


// productCategory Entity
export type ProductCategory = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export type ProductCategoryRelations = {
  Product: Product[];
};

export type ProductCategoryFull = ProductCategory & ProductCategoryRelations;
export type ProductCategoryWithCount = ProductCategoryFull & {
    _count: {
        Product: number;
    }
}


// product Entity
export type Product = {
  id: string;
  categoryId: string;
  supplierId: string;
  productBrandId: string;
  name: string;
  sku: string;
  description: string | null;
  entryPrice: number;
  unitPrice: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export type ProductRelations = {
  productBrand: ProductBrand;
  category: ProductCategory;
  supplier: Supplier;
  InventoryLevel: InventoryLevel[];
  PurchaseOrderItem: PurchaseOrderItem[];
  StockMovement: StockMovement[];
  ProductPriceHistory: ProductPriceHistory[];
};

export type ProductFull = Product & ProductRelations;
export type ProductWithCount = ProductFull & {
    _count: {
        InventoryLevel: number;
        PurchaseOrderItem: number;
        StockMovement: number;
        ProductPriceHistory: number;
    }
}


// productBrand Entity
export type ProductBrand = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductBrandRelations = {
  Product: Product[];
};

export type ProductBrandFull = ProductBrand & ProductBrandRelations;
export type ProductBrandWithCount = ProductBrandFull & {
    _count: {
        Product: number;
    }
}


// inventoryLevel Entity
export type InventoryLevel = {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  minStock: number;
  createdAt: Date;
  updatedAt: Date;
};

export type InventoryLevelRelations = {
  product: Product;
  warehouse: WareHouse;
};

export type InventoryLevelFull = InventoryLevel & InventoryLevelRelations;


// purchaseOrder Entity
export type PurchaseOrder = {
  id: string;
  supplierId: string;
  userId: string;
  orderDate: Date;
  status: PurchaseOrderStatus;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export type PurchaseOrderRelations = {
  supplier: Supplier;
  user: User;
  PurchaseOrderItem: PurchaseOrderItem[];
};

export type PurchaseOrderFull = PurchaseOrder & PurchaseOrderRelations;
export type PurchaseOrderWithCount = PurchaseOrderFull & {
    _count: {
        PurchaseOrderItem: number;
    }
}


// purchaseOrderItem Entity
export type PurchaseOrderItem = {
  id: string;
  purchaseOrderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export type PurchaseOrderItemRelations = {
  purchaseOrder: PurchaseOrder;
  product: Product;
};

export type PurchaseOrderItemFull = PurchaseOrderItem & PurchaseOrderItemRelations;


// stockMovement Entity
export type StockMovement = {
  id: string;
  fromWarehouseId: string | null;
  toWarehouseId: string | null;
  userId: string;
  productId: string;
  quantity: number;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
};

export type StockMovementRelations = {
  user: User;
  product: Product;
  fromWarehouse: WareHouse | null;
  toWarehouse: WareHouse | null;
};

export type StockMovementFull = StockMovement & StockMovementRelations;


// productPriceHistory Entity
export type ProductPriceHistory = {
  id: string;
  productId: string;
  userId: string;
  previousPrice: number;
  newPrice: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductPriceHistoryRelations = {
  product: Product;
  user: User;
};

export type ProductPriceHistoryFull = ProductPriceHistory & ProductPriceHistoryRelations;
