<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageOptimizationService
{
    public function optimizeForGallery(UploadedFile $image, string $directory): array
    {
        $publicDisk = Storage::disk('public');
        $publicDisk->makeDirectory($directory);

        $fileName = Str::uuid()->toString();
        $originalPath = "{$directory}/{$fileName}.webp";

        // 1. Guardar la imagen directamente (El Frontend JS ya la comprimió a WebP)
        $imageData = file_get_contents($image->getPathname());
        $publicDisk->put($originalPath, $imageData, 'public');

        // 2. Crear Blur-up Placeholder con PHP GD nativo (Cero dependencias)
        $source = @imagecreatefromstring($imageData);
        $blurHash = '';

        if ($source !== false) {
            $width = imagesx($source);
            $height = imagesy($source);

            // Escalar a miniatura de 20px manteniendo proporción
            $tinyWidth = 20;
            $tinyHeight = (int) (($height / $width) * $tinyWidth);

            $tiny = imagecreatetruecolor($tinyWidth, $tinyHeight);

            // Preservar transparencia si es necesario
            imagealphablending($tiny, false);
            imagesavealpha($tiny, true);

            imagecopyresampled($tiny, $source, 0, 0, 0, 0, $tinyWidth, $tinyHeight, $width, $height);

            // Aplicar desenfoque gaussiano 5 veces para un efecto ultra suave
            for ($i = 0; $i < 5; $i++) {
                imagefilter($tiny, IMG_FILTER_GAUSSIAN_BLUR);
            }

            ob_start();
            imagewebp($tiny, null, 20); // WebP al 20% de calidad para tamaño ínfimo
            $blurData = ob_get_clean();
            $blurHash = 'data:image/webp;base64,'.base64_encode($blurData);

            imagedestroy($source);
            imagedestroy($tiny);
        }

        return [
            'original_path' => $originalPath,
            'blur_placeholder' => $blurHash,
        ];
    }
}
