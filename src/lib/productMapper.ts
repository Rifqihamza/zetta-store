/**
 * Product Mapper - Converts Scalev API product data to Zetta Store product format
 *
 * This module handles the transformation of raw product data from the Scalev API
 * into the standardized Product format used throughout the Zetta Store application.
 */

import { ScalevProduct } from "@/types/scalev";
import { Product } from "@/types/product";

/**
 * Type guard to check if a value is a string
 * @param v - The value to check
 * @returns true if the value is a string
 */
function isString(v: unknown): v is string {
    return typeof v === "string";
}

/**
 * Type guard to check if a value is a record (object)
 * @param v - The value to check
 * @returns true if the value is a record/object
 */
function isRecord(v: unknown): v is Record<string, unknown> {
    return v !== null && typeof v === "object";
}

/**
 * Parses a price string into a number
 * Handles various price formats including different decimal separators
 * @param price - The price to parse (can be string, number, null, or undefined)
 * @returns The parsed price as a number, or null if parsing fails
 */
function parsePriceString(price?: string | number | null): number | null {
    // Handle null, undefined, or empty values
    if (price === null || price === undefined || price === "") {
        return null;
    }

    // If it's already a valid number, return it
    if (typeof price === "number") {
        return Number.isFinite(price) ? price : null;
    }

    // Convert to string and trim
    const priceString = String(price).trim();

    // Handle currency symbols like "Rp", "$", etc.
    const withoutCurrency = priceString.replace(/^[A-Za-z]+\s*/, '');

    // Clean the string by removing non-numeric characters except commas and periods
    const cleaned = withoutCurrency.replace(/[^\d.,-]/g, "");

    // Normalize decimal separators:
    // If the string contains commas but no periods, treat comma as decimal separator
    // Otherwise, remove all commas (treating them as thousand separators)
    const normalized = cleaned.includes(",") && !cleaned.includes(".")
        ? cleaned.replace(",", ".")
        : cleaned.replace(/,/g, "");

    // Convert to number and validate
    const n = Number(normalized);

    // Debug logging for price parsing issues
    if (!Number.isFinite(n)) {
        console.warn(`Failed to parse price: "${priceString}" -> "${cleaned}" -> "${normalized}"`);
        return null;
    }

    return n;
}

/**
 * Extracts the price from a Scalev product by checking multiple possible sources
 * @param p - The Scalev product to extract price from
 * @returns The extracted price, or 0 if no valid price is found
 */
function extractPriceFromScalevProduct(p: ScalevProduct): number {
    // Debug: Log the entire product structure to understand what we're working with
    console.log("DEBUG: Full Scalev product data:", {
        id: p.id,
        name: p.name,
        variants: p.variants,
        config: p.config,
        metadata: (p as Record<string, unknown>).metadata
    });

    // Get the first variant if available
    const variant = Array.isArray(p.variants) && p.variants.length > 0
        ? p.variants[0]
        : undefined;

    // Array to collect all valid price candidates
    const candidates: number[] = [];

    // Check variant prices if variant exists
    if (variant) {
        console.log("DEBUG: Variant data:", variant);
        const vPrice = parsePriceString(variant.price ?? null);
        if (vPrice !== null) candidates.push(vPrice);

        const vReseller = parsePriceString(variant.reseller_price ?? null);
        if (vReseller !== null) candidates.push(vReseller);

        const vBt = parsePriceString(variant.price_bt ?? null);
        if (vBt !== null) candidates.push(vBt);
    } else {
        console.log("DEBUG: No variants found in product");
    }

    // Check product config for price
    const productConfig = p as unknown as Record<string, unknown>;
    const config = productConfig["config"];

    if (isRecord(config)) {
        console.log("DEBUG: Config data:", config);
        const configPrice = config["price"];
        const parsedConfigPrice = parsePriceString(configPrice as string | number | null);
        if (parsedConfigPrice !== null) candidates.push(parsedConfigPrice);
    } else {
        console.log("DEBUG: No config found or config is not a record");
    }

    // Check product metadata for price
    const metadata = productConfig["metadata"];
    if (isRecord(metadata)) {
        console.log("DEBUG: Metadata data:", metadata);
        const metadataPrice = metadata["price"];
        const parsedMetadataPrice = parsePriceString(metadataPrice as string | number | null);
        if (parsedMetadataPrice !== null) candidates.push(parsedMetadataPrice);
    } else {
        console.log("DEBUG: No metadata found or metadata is not a record");
    }

    // Log all candidates found
    console.log("DEBUG: Price candidates found:", candidates);

    // Return the first valid price (>= 0), or 0 if none found
    const found = candidates.find((v) => v >= 0);
    const finalPrice = found ?? 0;

    console.log("DEBUG: Final price determined:", finalPrice);

    return finalPrice;
}

/**
 * Normalizes labels/categories from various formats to a consistent string array
 * @param labels - The raw labels data (can be strings or objects)
 * @returns Array of normalized label strings
 */
function normalizeLabels(labels?: Array<string | Record<string, unknown>>): string[] {
    if (!labels || labels.length === 0) {
        return [];
    }

    return labels
        .map((label) => {
            // Handle string labels
            if (isString(label)) {
                const trimmed = label.trim();
                return trimmed.length > 0 ? trimmed : undefined;
            }

            // Handle object labels
            if (isRecord(label)) {
                const name = label["name"];
                if (isString(name)) {
                    const trimmedName = name.trim();
                    return trimmedName.length > 0 ? trimmedName : undefined;
                }

                const id = label["id"];
                if (typeof id === "number") {
                    return String(id);
                }
            }

            return undefined;
        })
        .filter((label): label is string => typeof label === "string" && label.length > 0);
}

/**
 * Maps a Scalev product to the Zetta Store product format
 * @param p - The Scalev product to map
 * @returns The mapped Product in Zetta Store format
 */
export function mapScalevToProduct(p: ScalevProduct): Product {
    // Extract the price from the Scalev product
    const price = extractPriceFromScalevProduct(p);

    // Safely extract images array
    const images = Array.isArray(p.images) ? [...p.images] : [];

    // Normalize categories/labels
    const categories = normalizeLabels(p.labels);

    // Extract checkout URL from the first variant's self_file_urls if available
    const checkoutUrl = Array.isArray(p.variants) && p.variants.length > 0
        ? p.variants[0].self_file_urls?.[0]
        : undefined;

    // Determine the best description available
    let description = "No description available";

    if (typeof p.description === "string" && p.description.trim()) {
        description = p.description.trim();
    } else if (typeof p.rich_description === "string" && p.rich_description.trim()) {
        description = p.rich_description.trim();
    }

    // Return the mapped product
    return {
        id: String(p.id),
        title: p.name,
        slug: p.slug ?? undefined,
        desc: description,
        images,
        price,
        isFree: price === 0,
        categories,
        checkoutUrl,
    };
}
