/**
 * Compare 2 object with limited depth
 */
export declare function isDeepEqual(obj1: any, obj2: any, currentDepth: number, maxDepth: number): boolean;
/**
 * consider isSimilar as isDeepEqual with depth 2
 */
export declare function isSimilar(obj1: any, obj2: any): boolean;
