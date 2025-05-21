import React, {
  useState,
  useMemo,
  useContext,
} from 'react';
import { CallInfoContext } from '../../../context';

interface IGridLayoutPRops {
  rowHeight?: number;
  children?: any;
  unit?: 'vw' | '%';
  className?: string;
  enableFocus?: boolean;
  isMobile?: boolean;
  onHandleFocusChange?: (params?: any) => any;
}

export default function GridLayout(props: IGridLayoutPRops) {
  const { isFloat } = useContext(CallInfoContext);
  const width = 100;
  let {
    // eslint-disable-next-line prefer-const
    rowHeight, unit = '%', className, isMobile, onHandleFocusChange, enableFocus = false, children,
  } = props;
  const [focus, setFocus] = useState(null);
  const defaultLayout = useMemo(() => {
    const len = children.length;
    if (len <= 3) {
      return [{
        x: 0, y: 0, w: 6, h: 6,
      }, {
        x: 6, y: 0, w: 6, h: 6,
      }, {
        x: 3, y: 6, w: 6, h: 6,
      }];
    }
    if (len === 4) {
      return [{
        x: 0, y: 0, w: 6, h: 6,
      }, {
        x: 6, y: 0, w: 6, h: 6,
      }, {
        x: 0, y: 6, w: 6, h: 6,
      }, {
        x: 6, y: 6, w: 6, h: 6,
      }];
    }
    const layoutArr = [{
      x: 0, y: 0, w: 4, h: 4,
    }];
    for (let i = 1; i < len; i++) {
      const isWrap = layoutArr[i - 1].x + 4 === 12;
      layoutArr[i] = {
        x: layoutArr[i - 1].x + 4 === 12 ? 0 : layoutArr[i - 1].x + 4,
        y: layoutArr[i - 1].y + (isWrap ? 4 : 0),
        w: 4,
        h: 4,
      };
    }

    if (!isMobile) {
      if (len % 3 === 1) {
        layoutArr[len - 1].x += 2;
      }
      if (len % 3 === 2) {
        layoutArr[len - 1].x += 2;
        layoutArr[len - 2].x += 2;
      }
    }

    return layoutArr;
  }, [children, isMobile]);
  function handleClick(index) {
    if (index === focus) {
      setFocus(null);
      onHandleFocusChange?.(null);
    } else {
      setFocus(index);
      onHandleFocusChange?.(index);
    }
  }
  const colWidth = width / 12;
  rowHeight = colWidth;
  const arr = Object.keys(Array.from({ length: defaultLayout.length }));
  const newLayout = useMemo(() => {
    const defaultLayout1 = JSON.parse(JSON.stringify(defaultLayout));
    let colIndex;
    let rowIndex;
    if (focus != null) {
      if (arr.length < 5) {
        const newArr = arr.concat();
        newArr.splice(focus, 1);
        newArr.unshift(focus);
      } else {
        rowIndex = focus % 3;
        colIndex = Math.floor(focus / 3);
      }

      if (arr.length < 5) {
        for (let i = 0; i < defaultLayout1.length; i++) {
          const item = defaultLayout1[i];
          if (i === 0) {
            item.w += 6;
            item.h += 6;
          } else {
            item.x = (i - 1) * 4;
            item.y = 12;
            item.w = 4;
            item.h = 4;
          }
        }
        const rs = defaultLayout1.shift();
        defaultLayout1.splice(focus, 0, rs);
      } else {
        let focusStyle;
        if (rowIndex === 0) {
          if (defaultLayout1[focus + 1]) defaultLayout1[focus + 1].x += 4;
          if (defaultLayout1[focus + 2]) defaultLayout1[focus + 2].y += 4;
          focusStyle = {
            x: 0,
            y: colIndex * 4,
            w: 8,
            h: 8,
          };
        } else if (rowIndex === 2) {
          focusStyle = {
            x: 4,
            y: colIndex * 4,
            w: 8,
            h: 8,
          };
          defaultLayout1[focus - 1].x = 0;
          defaultLayout1[focus - 1].y += 4;
        } else if (rowIndex === 1) {
          focusStyle = {
            x: 4,
            y: colIndex * 4,
            w: 8,
            h: 8,
          };
          if (defaultLayout1[focus + 1]) {
            defaultLayout1[focus + 1].x = 0;
            defaultLayout1[focus + 1].y += 4;
          }
        }
        const start = 3 - rowIndex;
        for (let i = focus + start; i < defaultLayout1.length; i++) {
          const item = defaultLayout1[i];
          item.y += 4;
        }
        defaultLayout1[focus] = focusStyle;
      }

      return defaultLayout1;
    }
    return defaultLayout1;
  }, [focus, defaultLayout]);
  return (
    <div className={className}>
      {children?.map((child, index) => {
        const {
          x, y, w, h,
        } = newLayout[index];
        let style = {
          width: w * colWidth + unit,
          height: h * rowHeight + unit,
          left: (x) * colWidth + unit,
          top: (y) * rowHeight + unit,
          position: 'absolute',
        };

        if (isFloat) {
          style = {
            width: '100%',
            height: '100%',
            left: '0px',
            top: '0px',
            position: 'absolute',
          };
        }

        return React.cloneElement(
          child,
          { style, updateFocusItem: () => enableFocus && handleClick(index) },
        );
      })}
    </div>
  );
}
