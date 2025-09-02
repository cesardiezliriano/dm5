import { AdFormatSpec, ValidationResult, ValidationResultItem } from '../types';
import { TFunction } from 'i18next';

// Helper to parse size strings like "5MB" or "150KB" into bytes
const parseSizeInBytes = (sizeStr?: string): number => {
    if (!sizeStr) return Infinity;
    const match = sizeStr.toLowerCase().match(/(\d+(\.\d+)?)\s*(kb|mb|gb)/);
    if (!match) return Infinity;

    const size = parseFloat(match[1]);
    const unit = match[3];

    switch (unit) {
        case 'gb': return size * 1024 * 1024 * 1024;
        case 'mb': return size * 1024 * 1024;
        case 'kb': return size * 1024;
        default: return Infinity;
    }
};

// Helper to get image dimensions from a File object
const getImageDimensions = (file: File): Promise<{ width: number, height: number }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = reject;
            if(e.target?.result) {
                img.src = e.target.result as string;
            } else {
                reject(new Error("Could not read file for dimensions."));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Helper to check aspect ratio
// Tolerates small floating point inaccuracies
const checkAspectRatio = (width: number, height: number, specRatioStr: string): { compliant: boolean, actualRatio: string } => {
    if (height === 0) return { compliant: false, actualRatio: `${width}:${height}` };
    const actualRatioValue = width / height;
    
    // Function to calculate greatest common divisor for simplifying ratio
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(width, height);
    const simplifiedWidth = Math.round(width / commonDivisor);
    const simplifiedHeight = Math.round(height / commonDivisor);
    const actualRatioText = `${simplifiedWidth}:${simplifiedHeight} (${width}x${height}px)`;

    const specRatios = specRatioStr.split(/[,;]|\sor\s/).map(r => r.trim());

    for(const ratio of specRatios) {
        const parts = ratio.match(/(\d+(\.\d+)?):(\d+(\.\d+)?)/);
        if (parts) {
            const specW = parseFloat(parts[1]);
            const specH = parseFloat(parts[3]);
            if (specH === 0) continue; // Avoid division by zero
            if (Math.abs(actualRatioValue - (specW / specH)) < 0.02) {
                return { compliant: true, actualRatio: actualRatioText };
            }
        }
    }
    return { compliant: false, actualRatio: actualRatioText };
};


export const validateAsset = async (spec: AdFormatSpec, asset: File | string, t: TFunction): Promise<ValidationResult> => {
    const results: ValidationResultItem[] = [];

    if (typeof asset === 'string') { // Validating Text
        if (spec.maxLength && (spec.maxLength.unit === 'characters' || spec.maxLength.unit === 'words')) {
            const count = spec.maxLength.unit === 'words' ? asset.split(/\s+/).filter(Boolean).length : asset.length;
            const compliant = count <= spec.maxLength.value;
            results.push({
                key: 'maxLength',
                specName: t('validator.spec.maxLength'),
                expected: t('validator.spec.maxLengthExpected', { count: spec.maxLength.value, unit: spec.maxLength.unit }),
                actual: t('validator.spec.maxLengthActual', { count, unit: spec.maxLength.unit }),
                compliant,
            });
        }

    } else { // Validating File (Image/Video)
        const file = asset;

        // 1. File Type
        if (spec.fileTypes && spec.fileTypes.length > 0) {
            const fileExtension = file.name.split('.').pop()?.toUpperCase() || '';
            const mimeType = file.type;
            const compliant = spec.fileTypes.some(ft => 
                ft.toUpperCase() === fileExtension || mimeType.toUpperCase().includes(ft.toUpperCase())
            );
             results.push({
                key: 'fileTypes',
                specName: t('validator.spec.fileType'),
                expected: spec.fileTypes.join(', '),
                actual: fileExtension || mimeType,
                compliant: compliant,
            });
        }
        
        // 2. File Size
        if (spec.maxFileSize) {
            const maxSizeInBytes = parseSizeInBytes(spec.maxFileSize);
            const compliant = file.size <= maxSizeInBytes;
            results.push({
                key: 'maxFileSize',
                specName: t('validator.spec.maxFileSize'),
                expected: spec.maxFileSize,
                actual: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                compliant: compliant,
            });
        }
        
        // 3. Dimensions & Aspect Ratio (async) for images
        if (file.type.startsWith('image/')) {
            try {
                const { width, height } = await getImageDimensions(file);
                
                // Dimensions
                if (spec.dimensions) {
                    const compliant = width === spec.dimensions.width && height === spec.dimensions.height;
                    results.push({
                        key: 'dimensions',
                        specName: t('validator.spec.dimensions'),
                        expected: `${spec.dimensions.width}x${spec.dimensions.height}px`,
                        actual: `${width}x${height}px`,
                        compliant: compliant,
                    });
                }
    
                // Aspect Ratio
                if (spec.aspectRatio) {
                    const { compliant, actualRatio } = checkAspectRatio(width, height, spec.aspectRatio);
                     results.push({
                        key: 'aspectRatio',
                        specName: t('validator.spec.aspectRatio'),
                        expected: spec.aspectRatio,
                        actual: actualRatio,
                        compliant: compliant,
                    });
                }
    
                // Resolution
                if (spec.resolution?.includes('x')) {
                    const resParts = spec.resolution.toLowerCase().match(/(\d+)x(\d+)/);
                    if(resParts) {
                        const minWidth = parseInt(resParts[1], 10);
                        const minHeight = parseInt(resParts[2], 10);
                        const compliant = width >= minWidth && height >= minHeight;
                         results.push({
                            key: 'resolution',
                            specName: t('validator.spec.resolution'),
                            expected: spec.resolution,
                            actual: `${width}x${height}px`,
                            compliant: compliant
                        });
                    }
                }
    
            } catch (error) {
                console.error("Could not get image dimensions:", error);
                throw new Error(t('validator.errors.imageReadError'));
            }
        }
    }
    
    if (results.length === 0) {
        results.push({
            key: 'no_spec',
            specName: t('validator.spec.noSpec'),
            expected: '-',
            actual: '-',
            compliant: true,
        });
    }

    const overallCompliant = results.every(r => r.compliant);

    return { overallCompliant, results };
};