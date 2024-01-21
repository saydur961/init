import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classes from './backdrop.module.css';

interface IComp {
  close?: () => void;
  children: ReactNode;

  blur?: boolean;
  center?: boolean;
  width?: string;
  clsName?: string;
}

export const Backdrop: FC<IComp> = ({close, children, blur, center, width, clsName}) => {

  let clsList = [classes.root];

  if(blur) {
    clsList.push(classes.bg);
  }

  if(center) {
    clsList.push(classes.center);
  }

  return createPortal(
    <div 
      onClick={close}
      className={clsList.join(' ')}
    >
      <div onClick={e => e.stopPropagation()}
        style={{ ...(width && { width }) }}
        className={clsName || ''}
      >
        {
          children
        }
      </div>
    </div>,
    document.getElementById('backdrop')!
  )
}

// eslint-disable-next-line no-lone-blocks
{/* 

  index.html file:
  
    <div id="root"></div>
    <div id="backdrop"></div>

*/}