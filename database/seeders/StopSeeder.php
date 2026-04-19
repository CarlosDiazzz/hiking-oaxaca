<?php

namespace Database\Seeders;

use App\Models\Stop;
use Illuminate\Database\Seeder;

class StopSeeder extends Seeder
{
    public function run(): void
    {
        $itinerary = [
            // LOGÍSTICA
            ['slug' => 'jalatlaco', 'name' => 'Salida en Jalatlaco', 'time' => '6:00 AM', 'type' => 'logistics', 'description' => 'Punto de encuentro y abordaje de la van.'],
            ['slug' => 'llegada', 'name' => 'Llegada al Llano', 'time' => '8:00 AM', 'type' => 'logistics', 'description' => 'Arribo a Llano de las Flores y preparación.'],
            ['slug' => 'inicio', 'name' => 'Inicio del Hike', 'time' => '8:30 AM', 'type' => 'logistics', 'description' => 'Comenzamos la inmersión en la Sierra Norte.'],

            // PARADAS DE GALERÍA
            ['slug' => 'gruta', 'name' => 'Gruta de los ladrones', 'time' => 'Parada 1', 'type' => 'gallery', 'description' => 'Exploración de la formación rocosa histórica.'],
            ['slug' => 'mirador', 'name' => 'Paso Mirador', 'time' => 'Parada 2', 'type' => 'gallery', 'description' => 'Vistas panorámicas espectaculares del valle.'],
            ['slug' => 'cueva', 'name' => 'Cueva del niño perdido', 'time' => 'Parada 3', 'type' => 'gallery', 'description' => 'Misterio y naturaleza en las profundidades.'],
            ['slug' => 'pozo', 'name' => 'Pozo de los deseos', 'time' => 'Parada 4', 'type' => 'gallery', 'description' => 'Manantial de aguas cristalinas.'],
            ['slug' => 'tarzan', 'name' => 'Árbol del Tarzán', 'time' => 'Parada 5', 'type' => 'gallery', 'description' => 'Flora endémica y formaciones gigantes.'],
            ['slug' => 'cascada', 'name' => 'Cascada Velo de novia', 'time' => 'Parada 6', 'type' => 'gallery', 'description' => 'El majestuoso cierre de nuestro sendero acuático.'],

            // CIERRE Y EXTRAS
            ['slug' => 'descenso', 'name' => 'Descenso al llano', 'time' => '1:00 PM', 'type' => 'logistics', 'description' => 'Retorno sereno hacia la base.'],
            ['slug' => 'libre', 'name' => 'Tiempo Libre', 'time' => '1:30 PM', 'type' => 'gallery', 'description' => 'Bicis, caballos, cuatrimotos o tirolesa (opcional).'],
            ['slug' => 'comedor', 'name' => 'Visita al comedor', 'time' => '2:30 PM', 'type' => 'logistics', 'description' => 'Gastronomía auténtica de las comunidades serranas.'],
        ];

        foreach ($itinerary as $item) {
            Stop::updateOrCreate(
                ['slug' => $item['slug']],
                [
                    'name' => $item['name'],
                    'time_display' => $item['time'],
                    'type' => $item['type'],
                    'description' => $item['description'],
                    'cover_image_path' => "/images/stops/{$item['slug']}.jpg"
                ]
            );
        }
    }
}