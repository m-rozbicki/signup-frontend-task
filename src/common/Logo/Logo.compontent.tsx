import React, { useRef, useEffect, SVGAttributes } from 'react';
import { ReactComponent as LogoSvg } from './logo.svg';
import styles from './Logo.module.scss';

export const Logo = (props: SVGAttributes<SVGSVGElement>) => {
  const svgElement = useRef<SVGSVGElement>(null);

  useEffect(() => {
    svgElement.current?.querySelectorAll<SVGCircleElement>('circle')
      .forEach((circle) => {
        circle.classList.add(styles['logo__circle']);
      });

    const groups = [1, 2, 3, 4, 5]
      .map((number) => ({
        number,
        element: svgElement.current?.querySelector<SVGGElement>(`g#group-${number}`),
      }));

    const colorInterval = window.setInterval(() => {
      groups.forEach((group) => {
        group.element?.querySelectorAll<SVGCircleElement>('circle')
          .forEach((circle) => {
            window.setTimeout(() => {
              circle.classList.toggle(styles['logo__circle--blackberry']);
            }, group.number * 250 + Math.random() * 500);
          });
      });
    }, 3000);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <div>
      <LogoSvg ref={svgElement} className={styles['logo']} {...props} />
    </div>
  );
};
