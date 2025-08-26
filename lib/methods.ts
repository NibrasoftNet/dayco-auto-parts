import {SUPPLIERS} from "@/utils/constants/suppliers.constant";
import {MANUFACTURERS} from "@/utils/constants/manufacturers.constant";

// Function to get supplier property by supId
export function getSupplierProperty(supId: string, prop: keyof typeof SUPPLIERS[string]) {
    const supplier = SUPPLIERS[supId];
    if (!supplier) return null;
    return supplier[prop];
}

// Function to get manufacturer property by id + manufacturerId
export function getManufacturerProperty(
    id: number,
    manufacturerId: number,
    prop: keyof typeof MANUFACTURERS[number][number]
) {
    const manufacturer = MANUFACTURERS[id]?.[manufacturerId];
    if (!manufacturer) return null;
    return manufacturer[prop];
}