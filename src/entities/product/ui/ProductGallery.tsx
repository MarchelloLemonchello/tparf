'use client';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ImageWithFallback } from '@/shared/ui/image/ImageWithFallback';

export function ProductGallery({
                                   images,
                                   alt,
                               }: {
    images: { id: string; imageUrl: string; isMain: boolean; sortOrder: number }[];
    alt: string;
}) {
    const ordered = useMemo(
        () =>
            [...images].sort((a, b) => (Number(b.isMain) - Number(a.isMain)) || a.sortOrder - b.sortOrder),
        [images]
    );
    const [active, setActive] = useState(ordered[0]?.imageUrl);

    return (
        <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full overflow-hidden rounded border bg-white">
                <ImageWithFallback
                    src={active}
                    alt={alt}
                    fill
                    className="object-contain"
                    sizes="(min-width:1280px) 40vw, (min-width:1024px) 50vw, 100vw"
                />
            </div>
            {ordered.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {ordered.map((img) => (
                        <button
                            key={img.id}
                            type="button"
                            onClick={() => setActive(img.imageUrl)}
                            className={`relative aspect-square overflow-hidden rounded border ${active === img.imageUrl ? 'ring-2 ring-blue-500' : ''}`}
                            aria-label="Предпросмотр изображения"
                        >
                            <Image
                                src={img.imageUrl}
                                alt={alt}
                                fill
                                className="object-cover"
                                sizes="100px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
