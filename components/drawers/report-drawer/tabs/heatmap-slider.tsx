'use client';

import {
  Comparison,
  ComparisonItem,
  ComparisonHandle,
} from '@/components/ui/image-comparison';

import Image from 'next/image';

type HeatmapSliderProps = {
  beforeSrc: string;
  afterSrc: string;
};

export default function HeatmapSlider({
  beforeSrc,
  afterSrc,
}: HeatmapSliderProps) {
  return (
    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border shadow bg-muted mb-8">
      <Comparison className="h-full w-full" mode="drag">
        {/* Before Image */}
        <ComparisonItem position="right">
          <Image
            src={beforeSrc}
            alt="Before image"
            fill
            className="object-cover"
          />
        </ComparisonItem>

        {/* Heatmap / After Image */}
        <ComparisonItem position="left">
          <Image
            src={afterSrc}
            alt="Heatmap image"
            fill
            className="object-cover"
          />
        </ComparisonItem>

        <ComparisonHandle />
      </Comparison>
    </div>
  );
}
