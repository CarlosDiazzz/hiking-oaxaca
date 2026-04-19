const TARGET_MAX_BYTES = 1024 * 1024; // 1MB
const MAX_WIDTH = 1920;
const INITIAL_QUALITY = 0.8;
const MIN_QUALITY = 0.45;

const loadImage = (file) =>
    new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(image);
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('No se pudo leer la imagen para comprimir.'));
        };

        image.src = objectUrl;
    });

const canvasToBlob = (canvas, quality) =>
    new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error('No se pudo generar el blob comprimido.'));

                    return;
                }

                resolve(blob);
            },
            'image/webp',
            quality,
        );
    });

export async function compressImage(file) {
    if (!(file instanceof File) || !file.type.startsWith('image/')) {
        throw new Error('El archivo seleccionado no es una imagen válida.');
    }

    const image = await loadImage(file);
    const aspectRatio = image.height / image.width;
    let targetWidth = Math.min(image.width, MAX_WIDTH);
    let targetHeight = Math.round(targetWidth * aspectRatio);
    let quality = INITIAL_QUALITY;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('El navegador no soporta compresión por canvas.');
    }

    const renderBlob = async () => {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        context.clearRect(0, 0, targetWidth, targetHeight);
        context.drawImage(image, 0, 0, targetWidth, targetHeight);

        return canvasToBlob(canvas, quality);
    };

    let compressedBlob = await renderBlob();

    while (compressedBlob.size > TARGET_MAX_BYTES && (quality > MIN_QUALITY || targetWidth > 320)) {
        if (quality > MIN_QUALITY) {
            quality = Math.max(MIN_QUALITY, quality - 0.08);
        } else {
            targetWidth = Math.max(320, Math.round(targetWidth * 0.85));
            targetHeight = Math.round(targetWidth * aspectRatio);
        }

        compressedBlob = await renderBlob();
    }

    if (compressedBlob.size > TARGET_MAX_BYTES) {
        throw new Error('No se pudo comprimir la imagen por debajo de 1MB.');
    }

    const baseName = file.name.replace(/\.[^/.]+$/, '');

    return new File([compressedBlob], `${baseName}.webp`, {
        type: 'image/webp',
        lastModified: Date.now(),
    });
}
