declare module 'react-dom/client' {
    import { ReactNode } from 'react';
    export interface Root {
      render(element: ReactNode): void;
    }
  
    export function createRoot(container: Element | DocumentFragment): Root;
  }