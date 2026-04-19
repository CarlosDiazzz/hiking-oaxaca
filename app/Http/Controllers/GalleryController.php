<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\Stop;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Format;
use Intervention\Image\ImageManager;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function show(string $slug): Response
    {
        $stop = Stop::query()->where('slug', $slug)->firstOrFail();
        $photos = Photo::query()->where('stop_id', $stop->id)->latest()->get();

        return Inertia::render('Gallery/Show', [
            'stop' => $stop,
            'photos' => $photos,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'stop_id' => ['required', 'uuid', 'exists:stops,id'],
            'uploader_name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['required', 'file', 'max:5120', 'mimes:jpeg,png,webp', 'mimetypes:image/jpeg,image/png,image/webp'],
        ]);

        Stop::query()->findOrFail($validated['stop_id']);

        $uploadedImage = $request->file('image');
        $manager = ImageManager::usingDriver(Driver::class);
        $fileName = Str::uuid()->toString();

        $originalPath = "galleries/originals/{$fileName}.webp";
        $placeholderPath = "galleries/placeholders/{$fileName}.webp";

        $publicDisk = Storage::disk('public');
        $publicDisk->makeDirectory('galleries/originals');
        $publicDisk->makeDirectory('galleries/placeholders');

        $manager
            ->read($uploadedImage->getPathname())
            ->orient()
            ->encodeUsingFormat(Format::WEBP, quality: 82)
            ->save($publicDisk->path($originalPath));

        $manager
            ->read($uploadedImage->getPathname())
            ->orient()
            ->scale(width: 20)
            ->blur(25)
            ->encodeUsingFormat(Format::WEBP, quality: 35)
            ->save($publicDisk->path($placeholderPath));

        Photo::query()->create([
            'stop_id' => $validated['stop_id'],
            'uploader_name' => $validated['uploader_name'],
            'description' => $validated['description'],
            'original_path' => $originalPath,
            'blur_placeholder_path' => $placeholderPath,
        ]);

        return back()->with('status', 'Imagen subida correctamente.');
    }

    public function update(Request $request, Photo $photo): RedirectResponse
    {
        $validated = $request->validate([
            'stop_id' => ['sometimes', 'uuid', 'exists:stops,id'],
            'uploader_name' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['required', 'file', 'max:5120', 'mimes:jpeg,png,webp', 'mimetypes:image/jpeg,image/png,image/webp'],
        ]);

        if (isset($validated['stop_id'])) {
            Stop::query()->findOrFail($validated['stop_id']);
        }

        $uploadedImage = $request->file('image');
        $manager = ImageManager::usingDriver(Driver::class);
        $fileName = Str::uuid()->toString();

        $originalPath = "galleries/originals/{$fileName}.webp";
        $placeholderPath = "galleries/placeholders/{$fileName}.webp";

        $publicDisk = Storage::disk('public');
        $publicDisk->makeDirectory('galleries/originals');
        $publicDisk->makeDirectory('galleries/placeholders');

        $manager
            ->read($uploadedImage->getPathname())
            ->orient()
            ->encodeUsingFormat(Format::WEBP, quality: 82)
            ->save($publicDisk->path($originalPath));

        $manager
            ->read($uploadedImage->getPathname())
            ->orient()
            ->scale(width: 20)
            ->blur(25)
            ->encodeUsingFormat(Format::WEBP, quality: 35)
            ->save($publicDisk->path($placeholderPath));

        // Limpieza del archivo anterior para evitar basura en storage.
        $publicDisk->delete([$photo->original_path, $photo->blur_placeholder_path]);

        $photo->update([
            'stop_id' => $validated['stop_id'] ?? $photo->stop_id,
            'uploader_name' => $validated['uploader_name'] ?? $photo->uploader_name,
            'description' => array_key_exists('description', $validated) ? $validated['description'] : $photo->description,
            'original_path' => $originalPath,
            'blur_placeholder_path' => $placeholderPath,
        ]);

        return back()->with('status', 'Imagen actualizada correctamente.');
    }
}
