import type { OverviewData } from '@/types/overview'

export const dummyOverviewData: OverviewData = {
    signals: {
        visualImpact: 'medium',
        visualImpactText:
            'Attention capture is inconsistent. Some contexts will lose this creative in the noise.',
        cognitiveImpact: 'high',
        cognitiveImpactText:
            'Message is clear and fast to process. Cognitive load is not your problem.',
    },
    creativeFixes: [
        {
            id: 'fix-1',
            title: 'Increase CTA contrast and size',
            actionText: 'Use a bolder color — current contrast fails at fast-scroll speeds.',
            severity: 'critical',
            boundingBox: { x: 20, y: 78, width: 60, height: 12, label: 'CTA Button' },
        },
        {
            id: 'fix-2',
            title: 'Simplify message hierarchy',
            actionText: 'One primary message. Move secondary points off the creative entirely.',
            severity: 'moderate',
            boundingBox: { x: 10, y: 40, width: 80, height: 30, label: 'Message Block' },
        },
        {
            id: 'fix-3',
            title: 'Add whitespace around headline and CTA',
            actionText: 'Current density slows scan speed and reduces conversion likelihood.',
            severity: 'moderate',
            boundingBox: { x: 5, y: 10, width: 70, height: 25, label: 'Headline' },
        },
    ],
    strengths: [
        {
            id: 'strength-1',
            text: 'Brand mark is immediately identifiable in peripheral vision.',
        },
        {
            id: 'strength-2',
            text: 'Color palette creates strong figure-ground separation.',
        },
    ],
    creativeSrc:
        'https://images.squarespace-cdn.com/content/v1/5ef0ef1b02a1d05e6faff7ac/1593379290858-GI2TYZN1I701KK95J8W2/Ad_page_01.jpg',
}