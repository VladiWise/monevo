import { useRef } from "react";

export function useClickTouch(callback: () => void): [
  React.MouseEventHandler<HTMLDivElement>,
  React.TouchEventHandler<HTMLDivElement>,
  React.TouchEventHandler<HTMLDivElement>
] {

  const touchTriggered = useRef(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const MOVE_THRESHOLD = 10;

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Если срабатывание инициировано тачем, игнорируем click
    if (touchTriggered.current) {
      touchTriggered.current = false;
      return;
    }

    callback();
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };


  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartX.current);
    const deltaY = Math.abs(touch.clientY - touchStartY.current);

    // Если перемещение больше порогового значения — считаем, что это скролл, а не тап
    if (deltaX > MOVE_THRESHOLD || deltaY > MOVE_THRESHOLD) {
      return;
    }

    // Если перемещение минимально, обрабатываем как тап
    e.preventDefault();
    touchTriggered.current = true;
    callback();

    // Сбрасываем флаг через небольшой промежуток, чтобы избежать конфликта
    setTimeout(() => {
      touchTriggered.current = false;
    }, 500);
  };


  return [onClick, onTouchStart, onTouchEnd];
}