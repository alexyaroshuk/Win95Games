export interface GameComponentProps {
  isActive?: boolean;
}

export interface GameWindow {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType<GameComponentProps>;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  zIndex: number;
  isMaximized?: boolean;
  previousPosition?: {
    x: number;
    y: number;
  };
  previousSize?: {
    width: number;
    height: number;
  };
}