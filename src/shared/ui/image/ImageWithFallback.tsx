'use client';
import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

type Props = Omit<ImageProps, 'src'> & {
    src: string | undefined;
    fallbackSrc?: string;
};

export function ImageWithFallback({ src, fallbackSrc = '/placeholder.png', ...rest }: Props) {
    const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
    useEffect(() => {
        setImgSrc(src || fallbackSrc);
    }, [src, fallbackSrc]);

    return (
        <Image
            {...rest}
            src={imgSrc as string}
            onError={() => setImgSrc(fallbackSrc)}
            onLoadingComplete={(result) => {
                // если браузер вернул «битое» изображение нулевой ширины — переключаемся на фолбек
                if ((result as any).naturalWidth === 0) setImgSrc(fallbackSrc);
            }}
        />
    );
}
