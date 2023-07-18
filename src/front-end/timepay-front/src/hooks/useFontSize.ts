import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { fontSizeState } from '../states/uiState';

const useFontSize = () => {
  const fontSizeValue = useRecoilValue(fontSizeState);
  const [scaleValue, setScaleValue] = useState(1);

  const isBig = useMemo(() => {
    return fontSizeValue === 'big';
  }, [fontSizeValue]);

  useEffect(() => {
    if (isBig) setScaleValue(1.5);
    else setScaleValue(1);
  }, [isBig]);

  return { scaleValue, isBig };
};

export default useFontSize;
