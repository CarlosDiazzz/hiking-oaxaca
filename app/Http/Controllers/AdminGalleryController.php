<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\Stop;
use App\Services\ImageOptimizationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminGalleryController extends Controller
{
    public function index(): Response
    {
        $stops = Stop::where('type', 'gallery')
            ->withCount('photos')
            ->get(['id', 'name', 'slug', 'latitude', 'longitude', 'map_embed_url']);

        return Inertia::render('Admin/GalleryManager', [
            'stops' => $stops,
        ]);
    }

    public function show(Stop $stop): Response
    {
        $photos = Photo::query()
            ->where('stop_id', $stop->id)
            ->latest()
            ->get();

        return Inertia::render('Admin/GalleryDetail', [
            'stop' => $stop,
            'photos' => $photos,
        ]);
    }

    public function store(Request $request, ImageOptimizationService $imageOptimizationService): RedirectResponse
    {
        $validated = $request->validate([
            'stop_id' => ['required', 'uuid', 'exists:stops,id'],
            'uploader_name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'images' => ['required', 'array', 'min:1', 'max:5'],
            'images.*' => ['required', 'image', 'max:2048'],
        ]);

        $stop = Stop::query()->findOrFail($validated['stop_id']);
        $baseDirectory = "galleries/{$stop->id}";
        $uploaderName = Str::startsWith($validated['uploader_name'], '@')
            ? $validated['uploader_name']
            : "@{$validated['uploader_name']}";

        foreach ($request->file('images') as $image) {
            $optimized = $imageOptimizationService->optimizeForGallery($image, $baseDirectory);

            Photo::query()->create([
                'stop_id' => $stop->id,
                'uploader_name' => $uploaderName,
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'original_path' => $optimized['original_path'],
                'blur_placeholder_path' => $optimized['blur_placeholder'],
            ]);
        }

        return back()->with('success', 'Lote de imágenes procesado correctamente.');
    }

    public function destroy(Photo $photo): RedirectResponse
    {
        $publicDisk = Storage::disk('public');

        if ($photo->original_path) {
            $publicDisk->delete($photo->original_path);
        }

        if ($photo->blur_placeholder_path && Str::startsWith($photo->blur_placeholder_path, 'galleries/')) {
            $publicDisk->delete($photo->blur_placeholder_path);
        }

        $photo->delete();

        return back()->with('success', 'Foto eliminada correctamente.');
    }

    public function updateCoordinates(Request $request, Stop $stop): RedirectResponse
    {
        $validated = $request->validate([
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'map_embed_url' => ['nullable', 'string'],
        ]);

        $stop->update([
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'map_embed_url' => $validated['map_embed_url'] ?? null,
        ]);

        return back()->with('success', 'Coordenadas actualizadas correctamente.');
    }
}
