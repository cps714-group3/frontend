import { useWindowSize } from 'rooks';
import { HEADER_HEIGHT } from './constants';

export const convertPXToVH = (px: number, pageHeight: number) => {
    return px * (100 / pageHeight);
};

export const usePageHeight = () => {
    const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();

    return `${100 - convertPXToVH(HEADER_HEIGHT, innerHeight ?? 0)}vh`;
};
