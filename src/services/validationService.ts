import { AdFormatSpec, ValidationResult, ValidationResultItem } from '../types';
import { TFunction } from 'i18next';

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = (err) => {
      reject(err);
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
};

const getVideoMetadata = (file: File): Promise<{ duration: number; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
      });
      URL.revokeObjectURL(video.src);
    };
    video.onerror = (err) => {
        reject(err);
        URL.revokeObjectURL(video.src);
    };
    video.src = URL.createObjectURL(file);
  });
};

const parseFileSize = (sizeStr: string): number | null => {
  if (!sizeStr) return null;
  const match = sizeStr.toUpperCase().match(/^(\d+(\.\d+)?)\s*(KB|MB|GB)$/);
  if (!match) return null;

  const value = parseFloat(match[1]);
  const unit = match[3];

  switch (unit) {
    case 'KB':
      return value * 1024;
    case 'MB':
      return value * 1024 * 1024;
    case 'GB':
      return value * 1024 * 1024 * 1024;
    default:
      return value;
  }
};

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};


export const validateAsset = async (
  spec: AdFormatSpec,
  asset: File | string,
  t: TFunction
): Promise<ValidationResult> => {
  const results: ValidationResultItem[] = [];
  
  if (typeof asset === 'string') {
    // Text asset validation
    if (spec.maxLength && ['characters', 'words'].includes(spec.maxLength.unit)) {
        const actualLength = spec.maxLength.unit === 'words' ? asset.split(/\s+/).filter(Boolean).length : asset.length;
        const compliant = actualLength <= spec.maxLength.value;
        results.push({
            key: 'maxLength',
            specName: t('specsDisplay.maxLengthSizeLabel'),
            expected: `≤ ${spec.maxLength.value} ${spec.maxLength.unit}`,
            actual: `${actualLength} ${spec.maxLength.unit}`,
            compliant,
        });
    }
  } else {
    // File asset validation
    const file = asset;
    let metadata: { width?: number; height?: number; duration?: number } = {};

    try {
        if (file.type.startsWith('image/')) {
            const dims = await getImageDimensions(file);
            metadata.width = dims.width;
            metadata.height = dims.height;
        } else if (file.type.startsWith('video/')) {
            const meta = await getVideoMetadata(file);
            metadata = { ...meta };
        }
    } catch(e) {
        console.error("Error getting asset metadata:", e);
    }
    
    if (spec.fileTypes && spec.fileTypes.length > 0) {
        let fileExtension = file.name.split('.').pop()?.toUpperCase() ?? '';
        const originalExtension = fileExtension;
        if (fileExtension === 'JPG') {
            fileExtension = 'JPEG';
        }
        const compliant = spec.fileTypes.some(type => type.toUpperCase() === fileExtension);
        results.push({
            key: 'fileType',
            specName: t('specsDisplay.fileTypesLabel'),
            expected: spec.fileTypes.join(', '),
            actual: originalExtension,
            compliant,
        });
    }
    
    if (spec.maxFileSize) {
        const maxBytes = parseFileSize(spec.maxFileSize);
        if (maxBytes !== null) {
            const compliant = file.size <= maxBytes;
             results.push({
                key: 'maxFileSize',
                specName: t('specsDisplay.maxFileSizeLabel'),
                expected: `≤ ${spec.maxFileSize}`,
                actual: formatBytes(file.size),
                compliant,
            });
        }
    }

    if (spec.dimensions && typeof metadata.width === 'number' && typeof metadata.height === 'number') {
        const widthTolerance = spec.dimensions.width * 0.1;
        const heightTolerance = spec.dimensions.height * 0.1;
        const widthOk = Math.abs(metadata.width - spec.dimensions.width) <= widthTolerance;
        const heightOk = Math.abs(metadata.height - spec.dimensions.height) <= heightTolerance;
        const compliant = widthOk && heightOk;
        
        results.push({
            key: 'dimensions',
            specName: t('specsDisplay.dimensionsLabel'),
            expected: `${spec.dimensions.width}x${spec.dimensions.height}px`,
            actual: `${metadata.width}x${metadata.height}px`,
            compliant,
        });
    }
    
    if (spec.aspectRatio && typeof metadata.width === 'number' && typeof metadata.height === 'number' && metadata.height > 0) {
        const actualRatio = metadata.width / metadata.height;
        const supportedRatios = spec.aspectRatio.split(/[,;]|\sor\s/).map(r => {
            const [w, h] = r.trim().split(':').map(Number);
            return h !== 0 ? w / h : 0;
        }).filter(r => r > 0);
        
        const compliant = supportedRatios.some(expectedRatio => Math.abs(expectedRatio - actualRatio) < 0.02);
        results.push({
            key: 'aspectRatio',
            specName: t('specsDisplay.aspectRatioLabel'),
            expected: spec.aspectRatio,
            actual: `${metadata.width}x${metadata.height} (~${actualRatio.toFixed(2)}:1)`,
            compliant,
        });
    }
    
    if (spec.maxLength && spec.maxLength.unit === 'seconds' && typeof metadata.duration === 'number') {
        const compliant = metadata.duration <= spec.maxLength.value;
        results.push({
            key: 'maxLength',
            specName: t('specsDisplay.maxLengthSizeLabel'),
            expected: `≤ ${spec.maxLength.value}s`,
            actual: `${metadata.duration.toFixed(2)}s`,
            compliant,
        });
    }

    if (spec.resolution && typeof metadata.width === 'number' && typeof metadata.height === 'number') {
      const match = spec.resolution.match(/(\d+)x(\d+)/);
      if (match) {
          const expectedW = parseInt(match[1], 10);
          const expectedH = parseInt(match[2], 10);
          let compliant = false;
          if (spec.resolution.toLowerCase().includes('minimum') || spec.resolution.includes('≥')) {
              compliant = metadata.width >= expectedW && metadata.height >= expectedH;
          } else {
              compliant = metadata.width === expectedW && metadata.height === expectedH;
          }
          results.push({
              key: 'resolution',
              specName: t('specsDisplay.resolutionLabel'),
              expected: spec.resolution,
              actual: `${metadata.width}x${metadata.height}px`,
              compliant,
          });
      }
    }
  }
  
  const overallCompliant = results.every(r => r.compliant);

  return {
    overallCompliant,
    results,
  };
};